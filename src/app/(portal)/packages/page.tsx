import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { activatePackage } from "@/lib/actions/bookings";
import { packages } from "@/data/packages";
import FlashCountdown from "@/components/portal/FlashCountdown";

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
      <div style={{ paddingTop: "clamp(28px,4vw,56px)" }}>
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--portal-accent)" }}>Packages &amp; rewards</p>
        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(32px,4.6vw,58px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>Pay less, come more often.</h1>
        <p style={{ margin: "0 0 36px", fontSize: 17, lineHeight: 1.5, color: "#444141", maxWidth: "60ch" }}>
          Everything below stacks with loyalty points. Buy once, use across both branches.
        </p>
      </div>

      <div style={{ background: "var(--portal-ink)", color: "#f3f2f2", padding: "22px clamp(20px,3vw,32px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginBottom: 24 }}>
        <span style={{ background: "var(--portal-accent)", padding: "6px 12px", fontSize: 11, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>Flash sale</span>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: "-.02em", flex: 1, minWidth: 200 }}>25% off all colour services — this weekend only.</p>
        <FlashCountdown />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px,100%),1fr))", gap: 16 }}>
        {packages.map((p) => {
          const isOwned = owned.has(p.slug);
          const bg = p.dark ? "var(--portal-ink)" : "var(--portal-paper)";
          const fg = p.dark ? "#f3f2f2" : "var(--portal-ink)";
          const bodyFg = p.dark ? "#d7d3d3" : "#444141";
          const tagFg = p.dark ? "#9b9797" : "var(--portal-mute)";
          const rule = p.dark ? "#444141" : "var(--portal-line)";
          const href = p.slug === "flash" ? "/book" : undefined;

          return (
            <div key={p.slug} style={{ background: bg, color: fg, border: "2px solid var(--portal-ink)", padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: tagFg }}>{p.tag}</p>
                {isOwned && (
                  <span style={{ background: "var(--portal-accent)", color: "#f3f2f2", padding: "4px 9px", fontSize: 10, fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Active</span>
                )}
              </div>
              <h3 style={{ margin: 0, fontSize: 25, fontWeight: 900, letterSpacing: "-.035em", lineHeight: 1.08 }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: bodyFg }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "14px 0", borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}>
                {p.bullets.map((b) => (
                  <div key={b} style={{ display: "flex", gap: 9, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                    <span style={{ color: "var(--portal-accent)", fontWeight: 900 }}>›</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: "auto" }}>
                <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-.035em" }}>{p.price}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: tagFg }}>{p.per}</span>
              </div>

              {href ? (
                <a href={href} className="portal-btn" style={{ background: p.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${p.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}>
                  {p.cta}
                </a>
              ) : !user ? (
                <a href="/account/login" className="portal-btn" style={{ background: p.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${p.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}>
                  Sign in to {p.cta.toLowerCase()}
                </a>
              ) : (
                <form action={activatePackage}>
                  <input type="hidden" name="packageSlug" value={p.slug} />
                  <button
                    type="submit"
                    disabled={isOwned}
                    className="portal-btn"
                    style={{ width: "100%", background: p.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${p.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}
                  >
                    {isOwned ? "Active" : p.cta}
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
