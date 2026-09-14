"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCustomer, requireStaff } from "@/lib/dal";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { notifyBookingEvent, bookingWhatsAppLink } from "@/lib/notify";
import { site } from "@/data/site";

export type BookingFormState =
  | {
      errors?: { service?: string[]; date?: string[]; time?: string[]; branch?: string[] };
      message?: string;
      whatsappUrl?: string;
    }
  | undefined;

const BookingSchema = z.object({
  serviceSlug: z.string().min(1, "Choose a treatment."),
  branch: z.string().min(1, "Choose a branch."),
  date: z.string().min(1, "Choose a date."),
  time: z.string().min(1, "Choose a time."),
  notes: z.string().optional(),
});

export async function createBooking(_state: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const session = await requireCustomer();

  const validated = BookingSchema.safeParse({
    serviceSlug: formData.get("serviceSlug"),
    branch: formData.get("branch"),
    date: formData.get("date"),
    time: formData.get("time"),
    notes: formData.get("notes") ?? "",
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { serviceSlug, branch, date, time, notes } = validated.data;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    return { errors: { service: ["That treatment isn't available anymore."] } };
  }
  if (!locations.some((l) => l.city === branch)) {
    return { errors: { branch: ["Choose a valid branch."] } };
  }

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.userId } });

  const booking = await prisma.booking.create({
    data: {
      customerId: user.id,
      serviceSlug: service.slug,
      serviceName: service.title,
      category: service.category,
      branch,
      date,
      time,
      notes: notes || null,
    },
  });

  const summary = `${service.title} on ${date} at ${time} (${branch} branch)`;
  await notifyBookingEvent({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    bookingId: booking.id,
    title: "Booking received",
    body: `Your booking for ${summary} has been received. Staff will confirm the exact price and slot shortly.`,
  });

  const whatsappMessage = [
    `New booking — ${site.name}`,
    `Client: ${user.name} (${user.phone ?? "no phone on file"})`,
    `Treatment: ${service.title}`,
    `Branch: ${branch}`,
    `Date: ${date} at ${time}`,
    notes && `Notes: ${notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  revalidatePath("/account");
  return { message: "Booking confirmed.", whatsappUrl: bookingWhatsAppLink(whatsappMessage) };
}

export async function cancelBooking(formData: FormData) {
  const bookingId = String(formData.get("bookingId") ?? "");
  const session = await requireCustomer();

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.customerId !== session.userId) {
    throw new Error("Booking not found.");
  }
  if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
    throw new Error("This booking can no longer be cancelled.");
  }

  await prisma.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED" } });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.userId } });
  await notifyBookingEvent({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    bookingId: booking.id,
    title: "Booking cancelled",
    body: `Your booking for ${booking.serviceName} on ${booking.date} at ${booking.time} has been cancelled.`,
  });

  revalidatePath("/account");
}

export async function markNotificationsRead() {
  const session = await requireCustomer();
  await prisma.notification.updateMany({
    where: { userId: session.userId, read: false },
    data: { read: true },
  });
  revalidatePath("/account");
}

// ── Suite: online booking requests ──────────────────────────────────────
// A booking placed through the customer portal lands with
// source=WEBSITE, reviewStatus=PENDING until a staff member acts on it here
// — the real version of what the Suite mockup faked with a `localStorage`
// cross-read from the standalone customer-portal prototype.

export async function acceptOnlineBooking(formData: FormData) {
  await requireStaff();
  const bookingId = String(formData.get("bookingId") ?? "");
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.source !== "WEBSITE") throw new Error("Booking not found.");

  await prisma.booking.update({ where: { id: bookingId }, data: { reviewStatus: "ACCEPTED" } });

  const customer = await prisma.user.findUniqueOrThrow({ where: { id: booking.customerId } });
  await notifyBookingEvent({
    userId: customer.id,
    userEmail: customer.email,
    userName: customer.name,
    bookingId: booking.id,
    title: "Booking confirmed",
    body: `Your booking for ${booking.serviceName} on ${booking.date} at ${booking.time} is confirmed. See you then!`,
  });

  revalidatePath("/dashboard");
}

export async function declineOnlineBooking(formData: FormData) {
  await requireStaff();
  const bookingId = String(formData.get("bookingId") ?? "");
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.source !== "WEBSITE") throw new Error("Booking not found.");

  await prisma.booking.update({
    where: { id: bookingId },
    data: { reviewStatus: "DECLINED", status: "CANCELLED" },
  });

  const customer = await prisma.user.findUniqueOrThrow({ where: { id: booking.customerId } });
  await notifyBookingEvent({
    userId: customer.id,
    userEmail: customer.email,
    userName: customer.name,
    bookingId: booking.id,
    title: "Booking declined",
    body: `Sorry — we couldn't confirm your ${booking.serviceName} request for ${booking.date} at ${booking.time}. Your advance will be refunded; please call us to rebook.`,
  });

  revalidatePath("/dashboard");
}

// ── Suite: website control ──────────────────────────────────────────────
// Edits the one Service catalog both the marketing site and the customer
// portal read — the real version of the mockup's `publishSite()`, which
// only wrote to localStorage.

const ServiceListingSchema = z.object({
  serviceId: z.string().min(1),
  price: z.coerce.number().int().min(0),
});

export async function updateServicePrice(formData: FormData) {
  await requireStaff();
  const validated = ServiceListingSchema.safeParse({
    serviceId: formData.get("serviceId"),
    price: formData.get("price"),
  });
  if (!validated.success) return;
  await prisma.service.update({
    where: { id: validated.data.serviceId },
    data: { price: validated.data.price },
  });
  revalidatePath("/dashboard");
  revalidatePath("/services");
  revalidatePath("/book");
}

export async function toggleServiceVisibility(formData: FormData) {
  await requireStaff();
  const serviceId = String(formData.get("serviceId") ?? "");
  const current = await prisma.service.findUniqueOrThrow({ where: { id: serviceId } });
  await prisma.service.update({
    where: { id: serviceId },
    data: { visibleOnWebsite: !current.visibleOnWebsite },
  });
  revalidatePath("/dashboard");
  revalidatePath("/services");
  revalidatePath("/book");
}

// ── Customer portal: booking + packages ─────────────────────────────────

const PortalBookingSchema = z.object({
  serviceId: z.string().min(1, "Choose a treatment."),
  stylistId: z.string().min(1, "Choose a stylist."),
  branch: z.string().min(1),
  date: z.string().min(1, "Choose a date."),
  time: z.string().min(1, "Choose a time."),
  depositAmount: z.coerce.number().int().min(0),
  paymentMethod: z.string().min(1, "Choose a payment method."),
  notes: z.string().optional(),
});

export type PortalBookingState =
  | { errors?: Record<string, string[]>; message?: string; ref?: string }
  | undefined;

export async function createPortalBooking(_state: PortalBookingState, formData: FormData): Promise<PortalBookingState> {
  const session = await requireCustomer();

  const validated = PortalBookingSchema.safeParse({
    serviceId: formData.get("serviceId"),
    stylistId: formData.get("stylistId"),
    branch: formData.get("branch"),
    date: formData.get("date"),
    time: formData.get("time"),
    depositAmount: formData.get("depositAmount"),
    paymentMethod: formData.get("paymentMethod"),
    notes: formData.get("notes") ?? "",
  });
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }
  const { serviceId, stylistId, branch, date, time, depositAmount, paymentMethod, notes } = validated.data;

  const [service, stylist, user] = await Promise.all([
    prisma.service.findUnique({ where: { id: serviceId } }),
    prisma.stylist.findUnique({ where: { id: stylistId } }),
    prisma.user.findUniqueOrThrow({ where: { id: session.userId } }),
  ]);
  if (!service) return { message: "That treatment isn't available anymore." };
  if (!stylist) return { message: "That stylist isn't available anymore." };

  const pointsAwarded = Math.floor(service.price / 100);

  const [booking] = await prisma.$transaction([
    prisma.booking.create({
      data: {
        customerId: user.id,
        serviceSlug: service.slug,
        serviceName: service.name,
        category: service.category,
        stylistId: stylist.id,
        stylistName: stylist.name,
        branch,
        date,
        time,
        notes: notes || null,
        price: service.price,
        depositAmount,
        paymentMethod,
        pointsAwarded,
        source: "WEBSITE",
        reviewStatus: "PENDING",
        status: "CONFIRMED",
        paymentStatus: depositAmount >= service.price ? "PAID" : "PENDING",
      },
    }),
    prisma.user.update({ where: { id: user.id }, data: { points: { increment: pointsAwarded } } }),
    prisma.service.update({ where: { id: service.id }, data: { bookingsCount: { increment: 1 } } }),
  ]);

  await notifyBookingEvent({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    bookingId: booking.id,
    title: "Booking request received",
    body: `Your request for ${service.name} on ${date} at ${time} with ${stylist.name} is with our team — we'll confirm within the hour.`,
  });

  revalidatePath("/account");
  revalidatePath("/dashboard");
  return { message: "Booked.", ref: booking.id };
}

export async function cancelPortalBooking(formData: FormData) {
  const bookingId = String(formData.get("bookingId") ?? "");
  const session = await requireCustomer();
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.customerId !== session.userId) throw new Error("Booking not found.");
  if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
    throw new Error("This booking can no longer be cancelled.");
  }
  await prisma.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED" } });
  revalidatePath("/account");
  revalidatePath("/dashboard");
}

export async function activatePackage(formData: FormData) {
  const session = await requireCustomer();
  const packageSlug = String(formData.get("packageSlug") ?? "");
  if (!packageSlug) return;
  await prisma.userPackage.upsert({
    where: { userId_packageSlug: { userId: session.userId, packageSlug } },
    update: {},
    create: { userId: session.userId, packageSlug },
  });
  revalidatePath("/account");
  revalidatePath("/packages");
}
