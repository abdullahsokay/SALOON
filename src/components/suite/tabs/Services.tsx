"use client";

import { ServiceItem, money } from "@/lib/suite-data";

interface ServicesProps {
  services: ServiceItem[];
  openServiceModal: () => void;
}

export default function Services({ services, openServiceModal }: ServicesProps) {
  return (
    <section className="suite-card">
      <div className="suite-card-head">
        <div>
          <p className="suite-card-eyebrow">Treatment menu</p>
          <h2 className="suite-card-title">Pricing &amp; duration</h2>
        </div>
        <button className="suite-btn suite-btn-primary" style={{ minHeight: 36, fontSize: 13 }} onClick={openServiceModal}>Add treatment</button>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead>
            <tr><th>Code</th><th>Treatment</th><th>Category</th><th>Duration</th><th style={{ textAlign: "right" }}>Price</th><th style={{ textAlign: "right" }}>Bookings, 30d</th></tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-accent-700)" }}>{s.id}</td>
                <td style={{ fontWeight: 700 }}>{s.name}</td>
                <td style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{s.category}</td>
                <td style={{ fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-800)" }}>{s.duration}</td>
                <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(s.price)}</td>
                <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-800)" }}>{s.bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
