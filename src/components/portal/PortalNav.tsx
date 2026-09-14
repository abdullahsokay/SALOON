import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";

const navLinks = [
  { href: "/book", label: "Book" },
  { href: "/packages", label: "Packages" },
];

export default async function PortalNav() {
  const user = await getCurrentUser();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 80, height: 70, background: "var(--portal-paper)", display: "flex", alignItems: "center", gap: 28, padding: "0 clamp(16px,4vw,48px)", borderBottom: "1px solid var(--portal-line)" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--portal-ink)" }}>
        <span style={{ width: 26, height: 26, background: "var(--portal-accent)", display: "block" }} />
        <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase" }}>Jugnu</span>
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
        {navLinks.map((n) => (
          <Link key={n.href} href={n.href} style={{ padding: "9px 14px", fontSize: 14, fontWeight: 700, letterSpacing: "-.01em", color: "var(--portal-ink)" }}>
            {n.label}
          </Link>
        ))}
      </nav>

      {user ? (
        <Link href="/account" style={{ display: "flex", alignItems: "center", gap: 9, background: "#eae9e9", padding: "7px 14px 7px 8px", color: "var(--portal-ink)" }}>
          <span style={{ width: 28, height: 28, background: "var(--portal-accent)", color: "var(--portal-paper)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800 }}>
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{user.name.split(" ")[0]}</span>
        </Link>
      ) : (
        <Link href="/account/login" className="portal-btn portal-btn-dark" style={{ padding: "12px 20px", fontSize: 14 }}>
          Sign in
        </Link>
      )}
    </header>
  );
}
