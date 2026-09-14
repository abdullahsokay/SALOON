"use client";

import { Category } from "@/lib/suite-data";

export interface ServiceFormState {
  name: string;
  category: Category;
  duration: string;
  price: string;
}

interface ServiceModalProps {
  form: ServiceFormState;
  onChange: (patch: Partial<ServiceFormState>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ServiceModal({ form, onChange, onClose, onSubmit }: ServiceModalProps) {
  return (
    <div className="suite-dialog-backdrop">
      <form className="suite-dialog" onSubmit={onSubmit} style={{ width: "min(460px,100%)", padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--suite-text)" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em" }}>Add treatment</h3>
        </div>
        <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="suite-label">Name</label>
            <input className="suite-input" style={{ minHeight: 42 }} required value={form.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. Scalp Detox Ritual" />
          </div>
          <div>
            <label className="suite-label">Category</label>
            <select className="suite-input" style={{ minHeight: 42 }} value={form.category} onChange={(e) => onChange({ category: e.target.value as Category })}>
              <option>Hair</option><option>Makeup</option><option>Bridal</option><option>Skincare</option><option>Nails</option>
            </select>
          </div>
          <div>
            <label className="suite-label">Duration</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={form.duration} onChange={(e) => onChange({ duration: e.target.value })} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="suite-label">Price, PKR</label>
            <input className="suite-input" style={{ minHeight: 42 }} value={form.price} onChange={(e) => onChange({ price: e.target.value })} />
          </div>
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--suite-neutral-300)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button type="button" onClick={onClose} className="suite-btn suite-btn-secondary">Cancel</button>
          <button type="submit" className="suite-btn suite-btn-primary">Add to menu</button>
        </div>
      </form>
    </div>
  );
}
