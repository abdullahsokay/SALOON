"use client";

import { SalonSettings } from "@/lib/suite-data";

interface SettingsProps {
  settings: SalonSettings;
  onChange: (patch: Partial<SalonSettings>) => void;
  branch: string;
  onSave: () => void;
  onSignOut: () => void;
}

export default function Settings({ settings, onChange, branch, onSave, onSignOut }: SettingsProps) {
  return (
    <div className="suite-split">
      <section className="suite-card">
        <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
          <p className="suite-card-eyebrow">Operations</p>
          <h2 className="suite-card-title">Salon record</h2>
        </div>
        <div style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="suite-label">Legal name</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={settings.name} onChange={(e) => onChange({ name: e.target.value })} />
          </div>
          <div>
            <label className="suite-label">Address</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={settings.addr} onChange={(e) => onChange({ addr: e.target.value })} />
          </div>
          <div>
            <label className="suite-label">Reception line</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={settings.phone} onChange={(e) => onChange({ phone: e.target.value })} />
          </div>
          <div>
            <label className="suite-label">Opening hours</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={settings.hours} onChange={(e) => onChange({ hours: e.target.value })} />
          </div>
          <div>
            <label className="suite-label">Currency</label>
            <input className="suite-input" style={{ minHeight: 42, background: "var(--suite-neutral-100)", color: "var(--suite-neutral-700)" }} value="PKR" readOnly />
          </div>
          <div style={{ gridColumn: "1 / -1", borderTop: "1px solid var(--suite-neutral-300)", paddingTop: 16, display: "flex", gap: 10 }}>
            <button className="suite-btn suite-btn-primary" onClick={onSave}>Save changes</button>
            <button className="suite-btn suite-btn-secondary" onClick={onSignOut}>Sign out of terminal</button>
          </div>
        </div>
      </section>

      <section className="suite-card" style={{ background: "var(--suite-accent)", color: "#fff", padding: 22, border: "none" }}>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", opacity: .85 }}>Branch on this terminal</p>
        <p style={{ margin: "12px 0 0", fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{branch}</p>
        <p style={{ margin: "14px 0 0", fontSize: 13, opacity: .9 }}>Receipts, bookings and stock counts on this device post to this branch only.</p>
      </section>
    </div>
  );
}
