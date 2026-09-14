import type { Metadata } from "next";
import { requireCustomer } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { logoutCustomer } from "@/lib/actions/auth";
import { cancelPortalBooking, markNotificationsRead } from "@/lib/actions/bookings";
import { packages } from "@/data/packages";
import PointsRing from "@/components/portal/PointsRing";
import ReferralCode from "@/components/portal/ReferralCode";

export const metadata: Metadata = {
  title: "My Account — Jugnu's Salon & Studio",
};

function referralCodeFor(name: string) {
  const first = name.trim().split(" ")[0]?.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5) || "JUGNU";
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `JUGNU-${first}${suffix}`;
}

export default async function AccountPage() {
  const session = await requireCustomer();

  let user = await prisma.user.findUniqueOrThrow({ where: { id: session.userId } });
  if (!user.referralCode) {
    user = await prisma.user.update({ where: { id: user.id }, data: { referralCode: referralCodeFor(user.name) } });
  }

  const [bookings, notifications, ownedPackages] = await Promise.all([
    prisma.booking.findMany({ where: { customerId: session.userId }, orderBy: { createdAt: "desc" } }),
    prisma.notification.findMany({ where: { userId: session.userId, channel: "IN_APP" }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.userPackage.findMany({ where: { userId: session.userId } }),
  ]);

  const upcoming = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "IN_PROGRESS");
  const history = bookings.filter((b) => b.status === "COMPLETED");
  const lifetimeSpent = bookings.reduce((t, b) => t + (b.price ?? 0), 0);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const points = user.points;
  const pointsDeg = Math.min(360, Math.round(((points % 500) / 500) * 360));
  const pointsHint = points >= 500
    ? `Redeem PKR ${Math.floor(points / 500) * 500} off your next bill`
    : `${500 - (points % 500)} points to your next PKR 500 off`;

  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(28px,4vw,56px) clamp(16px,4vw,48px) clamp(60px,8vw,110px)" }}>
      <div className="portal-rise" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginBottom: 40 }}>
        <span style={{ width: 72, height: 72, background: "var(--portal-accent)", color: "#f3f2f2", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900 }}>
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{user.name}</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600, color: "var(--portal-mute)" }}>{user.email}</p>
        </div>
        <form action={logoutCustomer}>
          <button type="submit" className="portal-btn portal-btn-outline" style={{ padding: "12px 20px", fontSize: 13 }}>Sign out</button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px,100%),1fr))", gap: "0 32px", marginBottom: 44 }}>
        <PointsRing points={points} pointsDeg={pointsDeg} pointsHint={pointsHint} />
        <Stat label="Upcoming" value={String(upcoming.length)} sub={upcoming.length ? `Next: ${upcoming[0].date} · ${upcoming[0].time}` : "Nothing booked"} delay={80} />
        <Stat label="Visits" value={String(history.length)} sub="Completed with us" delay={120} />
        <Stat label="Spent" value={`PKR ${lifetimeSpent.toLocaleString("en-US")}`} sub="Lifetime, both branches" delay={160} />
      </div>

      <SectionHeading>Upcoming</SectionHeading>
      {upcoming.length === 0 && (
        <div style={{ border: "2px dashed var(--portal-line)", padding: 34, textAlign: "center", marginBottom: 44 }}>
          <p style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 700, color: "#444141" }}>Nothing booked yet.</p>
          <a href="/book" className="portal-btn portal-btn-primary">Book a visit</a>
        </div>
      )}
      <div style={{ display: "grid", gap: 12, marginBottom: 44 }}>
        {upcoming.map((b, i) => (
          <div key={b.id} className="portal-card portal-rise" style={{ animationDelay: `${i * 40}ms`, border: "2px solid var(--portal-ink)", padding: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px,100%),1fr))", gap: 20, alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.15 }}>{b.date} · {b.time}</p>
              <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600, color: "#444141" }}>{b.serviceName}</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 700, color: "var(--portal-accent)" }}>{b.stylistName ?? "Any stylist"} · {b.branch}</p>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--portal-mute)" }}>Advance paid</p>
              <p style={{ margin: "5px 0 0", fontSize: 18, fontWeight: 900, letterSpacing: "-.02em" }}>PKR {(b.depositAmount ?? 0).toLocaleString("en-US")}</p>
              {b.price != null && (
                <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 600, color: "var(--portal-mute)" }}>
                  PKR {(b.price - (b.depositAmount ?? 0)).toLocaleString("en-US")} due at salon{b.paymentMethod ? ` · ${b.paymentMethod}` : ""}
                </p>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <form action={cancelPortalBooking}>
                <input type="hidden" name="bookingId" value={b.id} />
                <button type="submit" style={{ background: "none", border: "2px solid rgba(32,30,29,.3)", padding: "12px 18px", cursor: "pointer", fontSize: 13, fontWeight: 800, color: "var(--portal-mute)" }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading>Your packages</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%),1fr))", gap: 12, marginBottom: 44 }}>
        {ownedPackages.map((op, i) => {
          const def = packages.find((p) => p.slug === op.packageSlug);
          return (
            <div key={op.id} className="portal-card portal-rise" style={{ animationDelay: `${i * 40}ms`, background: "#eae9e9", padding: 22 }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)" }}>{def?.tag ?? "Package"}</p>
              <h3 style={{ margin: "8px 0 0", fontSize: 19, fontWeight: 800, letterSpacing: "-.025em" }}>{def?.title ?? op.packageSlug}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 700, color: "var(--portal-accent)" }}>{op.status}</p>
            </div>
          );
        })}
        {ownedPackages.length === 0 && (
          <div style={{ border: "2px dashed var(--portal-line)", padding: 28 }}>
            <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#444141" }}>No packages yet. A membership pays for itself in two visits.</p>
            <a href="/packages" className="portal-btn portal-btn-dark">See packages</a>
          </div>
        )}
      </div>

      <div style={{ background: "var(--portal-accent)", color: "#f3f2f2", padding: 26, marginBottom: 44 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" }}>Refer &amp; earn</p>
        <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.45, maxWidth: "44ch" }}>
          Share your code. Your friend gets PKR 500 off their first visit, you get PKR 500 credit.
        </p>
        <ReferralCode code={user.referralCode ?? ""} />
      </div>

      <SectionHeading>Visit history</SectionHeading>
      <div style={{ display: "grid", gap: 2, background: "var(--portal-line)" }}>
        {history.map((h) => (
          <div key={h.id} style={{ background: "var(--portal-paper)", padding: "18px 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px,100%),1fr))", gap: 14, alignItems: "baseline" }}>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-.02em" }}>{h.date}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#444141" }}>{h.serviceName}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--portal-mute)" }}>{h.stylistName ?? "—"}</span>
            <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-.02em", textAlign: "right" }}>PKR {(h.price ?? 0).toLocaleString("en-US")}</span>
          </div>
        ))}
      </div>
      {history.length === 0 && (
        <p style={{ margin: "18px 0 0", fontSize: 15, fontWeight: 600, color: "var(--portal-mute)" }}>Your completed visits will show up here.</p>
      )}

      <SectionHeading>Updates</SectionHeading>
      <div style={{ border: "2px solid var(--portal-ink)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 18, borderBottom: "1px solid var(--portal-line)" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Notifications</h2>
          {unreadCount > 0 && (
            <form action={markNotificationsRead}>
              <button type="submit" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "var(--portal-accent)" }}>
                Mark all read
              </button>
            </form>
          )}
        </div>
        {notifications.length === 0 ? (
          <p style={{ padding: 18, fontSize: 14, color: "var(--portal-mute)" }}>No updates yet.</p>
        ) : (
          notifications.map((n, i) => (
            <div key={n.id} className="portal-rise" style={{ animationDelay: `${i * 30}ms`, padding: 18, borderBottom: "1px solid var(--portal-line)", background: n.read ? "transparent" : "rgba(236,48,19,.05)" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{n.title}</p>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--portal-mute)" }}>{n.body}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, sub, delay = 0 }: { label: string; value: string; sub: string; delay?: number }) {
  return (
    <div className="portal-rise" style={{ animationDelay: `${delay}ms`, background: "var(--portal-paper)", borderTop: "3px solid var(--portal-ink)", padding: "24px 0 26px" }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--portal-mute)" }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 900, letterSpacing: "-.035em", lineHeight: 1 }}>{value}</p>
      <p style={{ margin: "6px 0 0", fontSize: 13, fontWeight: 600, color: "var(--portal-mute)" }}>{sub}</p>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)", borderBottom: "1px solid var(--portal-line)", paddingBottom: 10 }}>
      {children}
    </h2>
  );
}
