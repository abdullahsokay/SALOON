import type { Metadata } from "next";
import { requireStaff } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { logoutStaff } from "@/lib/actions/auth";
import { acceptOnlineBooking, declineOnlineBooking, updateServicePrice, toggleServiceVisibility } from "@/lib/actions/bookings";
import { toggleStylistDuty, restockInventoryItem, toggleStaffAccess } from "@/lib/actions/suite";
import SuiteApp from "@/components/suite/SuiteApp";
import type { DutyStatus, AccessLevel as SuiteAccessLevel } from "@/lib/suite-data";

export const metadata: Metadata = {
  title: "Salon Suite — Jugnu's Salon & Studio",
};

// Suite roles are cosmetic (the mockup's demo accounts each carry a fixed
// title) — real access-level enforcement lives in the Team & access tab's
// AccessLevel, not in the User.role column, which only distinguishes
// CUSTOMER from STAFF.
const ROLE_BY_EMAIL: Record<string, string> = {
  "admin@jugnusalon.com": "General Manager",
  "reception@jugnusalon.com": "Head Receptionist",
  "mahnoor@jugnusalon.com": "Senior Stylist",
};

const ACCESS_LABEL: Record<string, SuiteAccessLevel> = {
  PENDING: "Pending",
  LIMITED: "Limited",
  FULL: "Full",
};

export default async function SalonDashboardPage() {
  const session = await requireStaff();

  const [staff, onlineBookings, services, stylists, inventory, staffUsers] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.userId } }),
    prisma.booking.findMany({
      where: { source: "WEBSITE", reviewStatus: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { customer: true },
    }),
    prisma.service.findMany({ orderBy: { category: "asc" } }),
    prisma.stylist.findMany({ orderBy: { name: "asc" } }),
    prisma.inventoryItem.findMany({ orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { role: "STAFF" }, orderBy: { name: "asc" } }),
  ]);

  return (
    <SuiteApp
      user={{ name: staff.name, role: ROLE_BY_EMAIL[staff.email] ?? "Staff" }}
      onSignOut={logoutStaff}
      onlineBookings={onlineBookings.map((b) => ({
        id: b.id,
        clientName: b.customer.name,
        clientPhone: b.customer.phone ?? "—",
        serviceName: b.serviceName,
        stylistName: b.stylistName ?? "Any stylist",
        branch: b.branch,
        date: b.date,
        time: b.time,
        depositAmount: b.depositAmount ?? 0,
        price: b.price ?? 0,
        paymentMethod: b.paymentMethod ?? "—",
      }))}
      websiteServices={services.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        durationLabel: `${s.durationMinutes} mins`,
        price: s.price,
        visibleOnWebsite: s.visibleOnWebsite,
      }))}
      acceptOnlineBooking={acceptOnlineBooking}
      declineOnlineBooking={declineOnlineBooking}
      updateServicePrice={updateServicePrice}
      toggleServiceVisibility={toggleServiceVisibility}
      dbStylists={stylists.map((s) => ({
        id: s.id, name: s.name, specialty: s.specialty, status: s.status as DutyStatus, rating: s.rating, appointmentsToday: 0,
      }))}
      dbInventory={inventory.map((i) => ({
        id: i.id, name: i.name, category: i.category, stock: i.stock, unit: i.unit, minAlert: i.minAlert,
      }))}
      dbTeam={staffUsers.map((u) => ({
        id: u.id, name: u.name, role: ROLE_BY_EMAIL[u.email] ?? "Staff", email: u.email, last: "—",
        access: ACCESS_LABEL[u.accessLevel] ?? "Full",
      }))}
      toggleStylistDutyAction={toggleStylistDuty}
      restockInventoryAction={restockInventoryItem}
      toggleStaffAccessAction={toggleStaffAccess}
    />
  );
}
