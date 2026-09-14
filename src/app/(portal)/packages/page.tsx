import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { packages } from "@/data/packages";
import FlashCountdown from "@/components/portal/FlashCountdown";
import PackageCard from "@/components/portal/PackageCard";

export const metadata: Metadata = {
  title: "Packages & Rewards — Jugnu's Salon & Studio",
};

export default async function PackagesPage() {
  const user = await getCurrentUser();
  const owned = user
    ? new Set((await prisma.userPackage.findMany({ where: { userId: user.id } })).map((p) => p.packageSlug))
    : new Set<string>();

  return (
    <main style={{ padding: "calc(0px) clamp(16px,4vw,48px) clamp(60px,8vw,110px)", maxWidth: 1440, margin: "0 auto" }}>
      <div className="portal-rise" style={{ paddingTop: "clamp(28px,4vw,56px)" }}>
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--portal-accent)" }}>Packages &amp; rewards</p>
        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(32px,4.6vw,58px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>Pay less, come more often.</h1>
        <p style={{ margin: "0 0 36px", fontSize: 17, lineHeight: 1.5, color: "#444141", maxWidth: "60ch" }}>
          Everything below stacks with loyalty points. Buy once, use across both branches.
        </p>
      </div>

      <div className="portal-rise" style={{ animationDelay: "80ms", background: "var(--portal-ink)", color: "#f3f2f2", padding: "22px clamp(20px,3vw,32px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginBottom: 24 }}>
        <span style={{ background: "var(--portal-accent)", padding: "6px 12px", fontSize: 11, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>Flash sale</span>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: "-.02em", flex: 1, minWidth: 200 }}>25% off all colour services — this weekend only.</p>
        <FlashCountdown />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px,100%),1fr))", gap: 16 }}>
        {packages.map((p, i) => (
          <PackageCard key={p.slug} pkg={p} index={i} isOwned={owned.has(p.slug)} signedIn={!!user} />
        ))}
      </div>
    </main>
  );
}
