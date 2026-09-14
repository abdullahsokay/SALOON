"use client";

import { Approval, money } from "@/lib/suite-data";
import type { DecoratedAppt, DecoratedStylist } from "../SuiteApp";

interface Bar {
  label: string;
  value: number;
  pct: number;
  fill: string;
}

interface CatSlice {
  label: string;
  value: string;
  pct: number;
  fill: string;
}

interface ChairBlock {
  left: number;
  width: number;
  fill: string;
  fg: string;
  label: string;
  title: string;
}

interface ChairRow {
  name: string;
  blocks: ChairBlock[];
}

interface Kpi {
  label: string;
  value: string;
  note: string;
  noteFg: string;
}

interface OverviewProps {
  kpis: Kpi[];
  bars: Bar[];
  weekTotal: string;
  catSplit: CatSlice[];
  hours: string[];
  chairRows: ChairRow[];
  deskAppts: DecoratedAppt[];
  apptCount: number;
  approvals: Approval[];
  onApprove: (id: string, title: string) => void;
  onDecline: (id: string, title: string) => void;
  roster: DecoratedStylist[];
  activity: { time: string; text: string }[];
  goAppointments: () => void;
  goBilling: () => void;
  goInventory: () => void;
  goStaff: () => void;
  openApptModal: () => void;
}

export default function Overview({
  kpis, bars, weekTotal, catSplit, hours, chairRows, deskAppts, apptCount,
  approvals, onApprove, onDecline, roster, activity,
  goAppointments, goBilling, goInventory, goStaff, openApptModal,
}: OverviewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--suite-gap)" }}>
      <div className="suite-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".13em", color: "var(--suite-neutral-700)" }}>{k.label}</p>
            <p style={{ margin: "10px 0 0", fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{k.value}</p>
            <p style={{ margin: "8px 0 0", fontSize: 12, fontWeight: 600, color: k.noteFg }}>{k.note}</p>
          </div>
        ))}
      </div>

      <div className="suite-split">
        <div className="suite-col">
          <section className="suite-card">
            <div className="suite-card-head">
              <div>
                <p className="suite-card-eyebrow">Last seven days</p>
                <h2 className="suite-card-title">Revenue, PKR thousands</h2>
              </div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "var(--suite-accent-700)" }}>{weekTotal} this week</p>
            </div>
            <div style={{ padding: "20px 18px 14px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 170, borderBottom: "2px solid var(--suite-text)" }}>
                {bars.map((b) => (
                  <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "stretch", height: "100%", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-700)" }}>{b.value}</span>
                    <div style={{ height: `${b.pct}%`, background: b.fill, minHeight: 2 }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, paddingTop: 8 }}>
                {bars.map((b) => (
                  <span key={b.label} style={{ flex: 1, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{b.label}</span>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--suite-neutral-300)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="suite-card-eyebrow">Revenue by category, today</p>
              {catSplit.map((c) => (
                <div key={c.label} style={{ display: "grid", gridTemplateColumns: "96px minmax(0,1fr) 92px", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{c.label}</span>
                  <div style={{ height: 10, background: "var(--suite-neutral-200)" }}>
                    <div style={{ height: 10, width: `${c.pct}%`, background: c.fill }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums", textAlign: "right", color: "var(--suite-neutral-800)" }}>{c.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="suite-card">
            <div className="suite-card-head">
              <div>
                <p className="suite-card-eyebrow">Today, 11:00 &ndash; 20:00</p>
                <h2 className="suite-card-title">Chair schedule</h2>
              </div>
              <button onClick={goAppointments} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--suite-accent-700)" }}>Open desk &rarr;</button>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr)", gap: 12, paddingBottom: 8, borderBottom: "1px solid var(--suite-neutral-300)" }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>Stylist</span>
                <div style={{ display: "flex" }}>
                  {hours.map((h) => (
                    <span key={h} style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "var(--suite-neutral-600)" }}>{h}</span>
                  ))}
                </div>
              </div>
              {chairRows.map((row) => (
                <div key={row.name} style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr)", gap: 12, alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--suite-neutral-200)" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.name}</span>
                  <div style={{ position: "relative", height: 22, background: "var(--suite-neutral-100)" }}>
                    {row.blocks.map((bl, i) => (
                      <div key={i} title={bl.title} style={{ position: "absolute", top: 0, height: 22, left: `${bl.left}%`, width: `${bl.width}%`, background: bl.fill, color: bl.fg, fontSize: 10, fontWeight: 700, padding: "0 6px", display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {bl.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="suite-card">
            <div className="suite-card-head">
              <div>
                <p className="suite-card-eyebrow">Live</p>
                <h2 className="suite-card-title">Appointments desk</h2>
              </div>
              <button onClick={goAppointments} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--suite-accent-700)" }}>View all {apptCount} &rarr;</button>
            </div>
            {deskAppts.map((a) => (
              <div key={a.id} style={{ padding: "14px 18px", borderBottom: "1px solid var(--suite-neutral-300)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 800 }}>{a.clientName}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{a.category}</span>
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--suite-neutral-700)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {a.serviceName} &middot; {a.stylistName} &middot; {a.time}
                  </p>
                </div>
                <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(a.price)}</span>
                  <span className="suite-badge" style={{ background: a.tone.bg, color: a.tone.fg, borderColor: a.tone.bd }}>{a.status}</span>
                  {a.nextLabel && (
                    <button className="suite-btn suite-btn-secondary" style={{ minHeight: 32, padding: "0 12px", fontSize: 12 }} onClick={a.advance}>{a.nextLabel}</button>
                  )}
                  <button className="suite-btn suite-btn-secondary suite-btn-icon" style={{ width: 32, height: 32 }} title="Receipt" onClick={a.openInvoice}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="suite-col">
          <section className="suite-card">
            <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em" }}>Quick actions</h2>
            </div>
            <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="suite-btn suite-btn-primary" style={{ justifyContent: "flex-start", fontSize: 13 }} onClick={openApptModal}>Take a booking</button>
              <button className="suite-btn suite-btn-secondary" style={{ justifyContent: "flex-start", fontSize: 13 }} onClick={goBilling}>Settle a bill</button>
              <button className="suite-btn suite-btn-secondary" style={{ justifyContent: "flex-start", fontSize: 13 }} onClick={goInventory}>Restock supplies</button>
              <button className="suite-btn suite-btn-secondary" style={{ justifyContent: "flex-start", fontSize: 13 }} onClick={goStaff}>Set duty roster</button>
            </div>
          </section>

          <section className="suite-card">
            <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em" }}>Approvals</h2>
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--suite-accent-700)" }}>{approvals.length} pending</span>
            </div>
            {approvals.map((ap) => (
              <div key={ap.id} style={{ padding: "13px 18px", borderBottom: "1px solid var(--suite-neutral-300)", display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{ap.kind}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{ap.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--suite-neutral-700)" }}>{ap.detail}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="suite-btn suite-btn-primary" style={{ minHeight: 30, padding: "0 12px", fontSize: 12 }} onClick={() => onApprove(ap.id, ap.title)}>Approve</button>
                  <button className="suite-btn suite-btn-secondary" style={{ minHeight: 30, padding: "0 12px", fontSize: 12 }} onClick={() => onDecline(ap.id, ap.title)}>Decline</button>
                </div>
              </div>
            ))}
          </section>

          <section className="suite-card">
            <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em" }}>Stylists on duty</h2>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>Tap to cycle</span>
            </div>
            {roster.map((st) => (
              <button key={st.id} onClick={st.toggle} style={{ width: "100%", textAlign: "left", border: 0, borderBottom: "1px solid var(--suite-neutral-300)", background: "#fff", cursor: "pointer", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 800 }}>{st.name}</span>
                  <span style={{ display: "block", fontSize: 11, color: "var(--suite-neutral-700)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{st.specialty}</span>
                </span>
                <span className="suite-badge" style={{ flex: "none", background: st.tone.bg, color: st.tone.fg, borderColor: st.tone.bd }}>{st.status}</span>
              </button>
            ))}
          </section>

          <section className="suite-card">
            <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em" }}>Activity</h2>
            </div>
            <div style={{ padding: "6px 18px 14px" }}>
              {activity.map((ev, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "52px minmax(0,1fr)", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--suite-neutral-200)" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-600)" }}>{ev.time}</span>
                  <span style={{ fontSize: 12, color: "var(--suite-neutral-800)" }}>{ev.text}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
