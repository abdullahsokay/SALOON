"use client";

import { activatePackage } from "@/lib/actions/bookings";
import type { PackageDef } from "@/data/packages";

// Cursor-tracked spotlight glow (see .portal-glow-card in portal.css) — the
// one thing a Server Component can't do on its own, so the card gets
// pulled out as its own client leaf instead of making the whole packages
// page client.
export default function PackageCard({
  pkg, index, isOwned, signedIn,
}: {
  pkg: PackageDef;
  index: number;
  isOwned: boolean;
  signedIn: boolean;
}) {
  const bg = pkg.dark ? "var(--portal-ink)" : "var(--portal-paper)";
  const fg = pkg.dark ? "#f3f2f2" : "var(--portal-ink)";
  const bodyFg = pkg.dark ? "#d7d3d3" : "#444141";
  const tagFg = pkg.dark ? "#9b9797" : "var(--portal-mute)";
  const rule = pkg.dark ? "#444141" : "var(--portal-line)";
  const href = pkg.slug === "flash" ? "/book" : undefined;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={onMove}
      className="portal-card portal-glow-card portal-rise"
      style={{ animationDelay: `${120 + index * 50}ms`, background: bg, color: fg, border: "2px solid var(--portal-ink)", padding: 28, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: tagFg }}>{pkg.tag}</p>
        {isOwned && (
          <span className="portal-rise" style={{ background: "var(--portal-accent)", color: "#f3f2f2", padding: "4px 9px", fontSize: 10, fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" }}>Active</span>
        )}
      </div>
      <h3 style={{ margin: 0, fontSize: 25, fontWeight: 900, letterSpacing: "-.035em", lineHeight: 1.08 }}>{pkg.title}</h3>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: bodyFg }}>{pkg.desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "14px 0", borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}>
        {pkg.bullets.map((b) => (
          <div key={b} style={{ display: "flex", gap: 9, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
            <span style={{ color: "var(--portal-accent)", fontWeight: 900 }}>›</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: "auto" }}>
        <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-.035em" }}>{pkg.price}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: tagFg }}>{pkg.per}</span>
      </div>

      {href ? (
        <a href={href} className="portal-btn" style={{ background: pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}>
          {pkg.cta}
        </a>
      ) : !signedIn ? (
        <a href="/account/login" className="portal-btn" style={{ background: pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}>
          Sign in to {pkg.cta.toLowerCase()}
        </a>
      ) : (
        <form action={activatePackage}>
          <input type="hidden" name="packageSlug" value={pkg.slug} />
          <button
            type="submit"
            disabled={isOwned}
            className="portal-btn"
            style={{ width: "100%", background: pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)", color: "#f3f2f2", border: `2px solid ${pkg.dark ? "var(--portal-accent)" : "var(--portal-ink)"}` }}
          >
            {isOwned ? "Active" : pkg.cta}
          </button>
        </form>
      )}
    </div>
  );
}
