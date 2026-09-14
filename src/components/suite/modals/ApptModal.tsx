"use client";

import { ServiceItem, Stylist, money } from "@/lib/suite-data";

export interface ApptFormState {
  client: string;
  phone: string;
  service: string;
  stylist: string;
  time: string;
}

interface ApptModalProps {
  branch: string;
  form: ApptFormState;
  onChange: (patch: Partial<ApptFormState>) => void;
  services: ServiceItem[];
  stylists: Stylist[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ApptModal({ branch, form, onChange, services, stylists, onClose, onSubmit }: ApptModalProps) {
  const svc = services.find((s) => s.name === form.service);

  return (
    <div className="suite-dialog-backdrop">
      <form className="suite-dialog" onSubmit={onSubmit} style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--suite-text)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p className="suite-card-eyebrow">{branch}</p>
            <h3 style={{ margin: "3px 0 0", fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em" }}>New booking</h3>
          </div>
          <button type="button" onClick={onClose} className="suite-btn suite-btn-secondary suite-btn-icon" style={{ width: 34, height: 34 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label className="suite-label">Client name</label>
            <input className="suite-input" style={{ minHeight: 42 }} required value={form.client} onChange={(e) => onChange({ client: e.target.value })} placeholder="e.g. Mariam Siddiqui" />
          </div>
          <div>
            <label className="suite-label">Phone</label>
            <input className="suite-input" style={{ minHeight: 42 }} required value={form.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="0300-1234567" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="suite-label">Treatment</label>
            <select className="suite-input" style={{ minHeight: 42 }} value={form.service} onChange={(e) => onChange({ service: e.target.value })}>
              {services.map((s) => (
                <option key={s.id} value={s.name}>{s.name} - {money(s.price)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="suite-label">Stylist</label>
            <select className="suite-input" style={{ minHeight: 42 }} value={form.stylist} onChange={(e) => onChange({ stylist: e.target.value })}>
              {stylists.map((s) => (
                <option key={s.id} value={s.name}>{s.name} - {s.status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="suite-label">Time</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={form.time} onChange={(e) => onChange({ time: e.target.value })} />
          </div>
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--suite-neutral-300)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--suite-neutral-800)" }}>Total {money(svc ? svc.price : 0)}</span>
          <span style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={onClose} className="suite-btn suite-btn-secondary">Cancel</button>
            <button type="submit" className="suite-btn suite-btn-primary">Confirm booking</button>
          </span>
        </div>
      </form>
    </div>
  );
}
