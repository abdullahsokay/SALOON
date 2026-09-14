"use client";

import { money } from "@/lib/suite-data";

export interface WebsiteServiceRow {
  id: string;
  name: string;
  category: string;
  durationLabel: string;
  price: number;
  visibleOnWebsite: boolean;
}

interface WebsiteProps {
  services: WebsiteServiceRow[];
  updatePrice: (formData: FormData) => void;
  toggleVisibility: (formData: FormData) => void;
}

export default function Website({ services, updatePrice, toggleVisibility }: WebsiteProps) {
  const shownCount = services.filter((s) => s.visibleOnWebsite).length;

  return (
    <section className="suite-card">
      <div className="suite-card-head">
        <div>
          <p className="suite-card-eyebrow">Public menu — jugnusalon.com</p>
          <h2 className="suite-card-title">{shownCount} of {services.length} treatments visible</h2>
        </div>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>
          Saves go live immediately
        </p>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead>
            <tr>
              <th>Treatment</th><th>Category</th><th>Duration</th>
              <th style={{ textAlign: "right" }}>Price, PKR</th>
              <th style={{ textAlign: "right" }}>On website</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 700 }}>{s.name}</td>
                <td style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{s.category}</td>
                <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>{s.durationLabel}</td>
                <td style={{ textAlign: "right" }}>
                  <form action={updatePrice} style={{ display: "inline-flex", gap: 6, justifyContent: "flex-end" }}>
                    <input type="hidden" name="serviceId" value={s.id} />
                    <input
                      name="price"
                      type="number"
                      min={0}
                      step={500}
                      defaultValue={s.price}
                      className="suite-input"
                      style={{ width: 110, minHeight: 34, textAlign: "right", fontVariantNumeric: "tabular-nums" }}
                    />
                    <button type="submit" className="suite-btn suite-btn-secondary" style={{ minHeight: 34, padding: "0 10px", fontSize: 12 }}>
                      Save
                    </button>
                  </form>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--suite-neutral-600)" }}>Currently {money(s.price)}</p>
                </td>
                <td style={{ textAlign: "right" }}>
                  <form action={toggleVisibility}>
                    <input type="hidden" name="serviceId" value={s.id} />
                    <button
                      type="submit"
                      className="suite-badge"
                      style={{
                        cursor: "pointer",
                        background: s.visibleOnWebsite ? "var(--suite-accent-200)" : "transparent",
                        color: s.visibleOnWebsite ? "var(--suite-accent-800)" : "var(--suite-neutral-700)",
                        borderColor: s.visibleOnWebsite ? "var(--suite-accent-300)" : "var(--suite-neutral-400)",
                      }}
                    >
                      {s.visibleOnWebsite ? "Visible" : "Hidden"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
