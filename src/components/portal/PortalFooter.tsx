import Link from "next/link";
import { site } from "@/data/site";
import { locations } from "@/data/locations";

export default function PortalFooter() {
  const [isb, jhelum] = locations;

  return (
    <footer style={{ background: "var(--portal-ink)", color: "#f3f2f2", padding: "clamp(40px,6vw,72px) clamp(16px,4vw,48px) 40px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px,100%),1fr))", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 22, background: "var(--portal-accent)", display: "block" }} />
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase" }}>Jugnu</span>
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.5, color: "#bab6b6", maxWidth: "30ch" }}>
            Hair, skin and bridal studio. One booking account, hold your slot with an advance.
          </p>
        </div>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#9b9797" }}>{isb.city}</p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#f3f2f2" }}>
            {isb.address}
            <br />
            {isb.hours}
            <br />
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{isb.phone}</span>
          </p>
        </div>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#9b9797" }}>{jhelum.city}</p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#f3f2f2" }}>{jhelum.note}</p>
        </div>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#9b9797" }}>Book</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <Link href="/book" style={{ fontSize: 14, fontWeight: 700, color: "#f3f2f2" }}>Book an appointment</Link>
            <Link href="/packages" style={{ fontSize: 14, fontWeight: 700, color: "#f3f2f2" }}>Packages &amp; gift cards</Link>
            <Link href="/account" style={{ fontSize: 14, fontWeight: 700, color: "#f3f2f2" }}>My account</Link>
            <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: "#f3f2f2" }}>&larr; Back to the main site</Link>
          </div>
        </div>
      </div>
      <p style={{ maxWidth: 1440, margin: "44px auto 0", paddingTop: 20, borderTop: "1px solid #444141", fontSize: 12, fontWeight: 600, color: "#9b9797" }}>
        © {new Date().getFullYear()} {site.name} · Prices in PKR
      </p>
    </footer>
  );
}
