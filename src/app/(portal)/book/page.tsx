import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import PortalHero from "@/components/portal/PortalHero";
import BookFlow from "@/components/portal/BookFlow";

export const metadata: Metadata = {
  title: "Book an Appointment — Jugnu's Salon & Studio",
};

const BRANCH = "F-7 Markaz, Islamabad";

export default async function BookPage() {
  const [user, services, stylists] = await Promise.all([
    getCurrentUser(),
    prisma.service.findMany({ where: { visibleOnWebsite: true }, orderBy: { category: "asc" } }),
    prisma.stylist.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "clamp(40px,6vw,72px) clamp(16px,4vw,48px) 0" }}>
        <PortalHero nextFreeLabel="Within the hour" />
      </div>
      <BookFlow
        services={services.map((s) => ({
          id: s.id, slug: s.slug, category: s.category, name: s.name, durationMinutes: s.durationMinutes, price: s.price,
        }))}
        stylists={stylists.map((s) => ({ id: s.id, name: s.name, specialty: s.specialty, branch: s.branch }))}
        branch={BRANCH}
        signedIn={!!user && user.role === "CUSTOMER"}
        initialName={user?.name ?? ""}
        initialPhone={user?.phone ?? ""}
      />
    </div>
  );
}
