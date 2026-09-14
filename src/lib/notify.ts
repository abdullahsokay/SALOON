import "server-only";
import { prisma } from "./prisma";
import { site } from "@/data/site";

interface NotifyBookingArgs {
  userId: string;
  userEmail: string;
  userName: string;
  bookingId: string;
  title: string;
  body: string;
}

/** In-app notification row — always works, no external service required. */
export async function notifyInApp({ userId, bookingId, title, body }: NotifyBookingArgs) {
  await prisma.notification.create({
    data: { userId, bookingId, channel: "IN_APP", title, body },
  });
}

/**
 * Builds a WhatsApp deep link to the SALON's number with the booking details
 * prefilled. There's no WhatsApp Business API credential in this project, so
 * we can't push a message to the customer's phone automatically — this link
 * is what the confirmation screen offers the customer to tap, the same
 * pattern already used by the public booking form.
 */
export function bookingWhatsAppLink(message: string) {
  const number = site.phonePrimaryHref.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Sends a real email via Resend if RESEND_API_KEY is configured. Without it,
 * this just logs — so the booking flow still works end to end in an
 * environment with no email provider set up yet.
 */
export async function notifyEmail({ userEmail, userName, title, body }: NotifyBookingArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[notify] (no RESEND_API_KEY set) would email ${userEmail}: ${title} — ${body}`);
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.RESEND_FROM || "Jugnu's Salon <onboarding@resend.dev>",
    to: userEmail,
    subject: title,
    text: `Hi ${userName},\n\n${body}\n\n— ${site.name}`,
  });
}

export async function notifyBookingEvent(args: NotifyBookingArgs) {
  await notifyInApp(args);
  await notifyEmail(args).catch((err) => console.error("[notify] email failed:", err));
}
