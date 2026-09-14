"use client";

import { ClientRecord, money } from "@/lib/suite-data";

interface ClientsProps {
  clients: ClientRecord[];
}

export default function Clients({ clients }: ClientsProps) {
  return (
    <section className="suite-card">
      <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
        <p className="suite-card-eyebrow">Directory</p>
        <h2 className="suite-card-title">{clients.length} clients on record</h2>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead><tr><th>Client</th><th>Contact</th><th>Segment</th><th style={{ textAlign: "right" }}>Visits</th><th style={{ textAlign: "right" }}>Lifetime value</th><th>Last visit</th></tr></thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700 }}>{c.name}</td>
                <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>
                  <span style={{ display: "block" }}>{c.phone}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--suite-neutral-700)" }}>{c.email}</span>
                </td>
                <td style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-accent-700)" }}>{c.badge}</td>
                <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{c.visits}</td>
                <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(c.totalSpent)}</td>
                <td style={{ fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-700)" }}>{c.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
