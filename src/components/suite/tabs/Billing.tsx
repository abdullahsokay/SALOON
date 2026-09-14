"use client";

import { money } from "@/lib/suite-data";
import type { DecoratedAppt } from "../SuiteApp";

interface BillingProps {
  paidTotal: number;
  pendingTotal: number;
  avgTicket: number;
  appts: DecoratedAppt[];
}

export default function Billing({ paidTotal, pendingTotal, avgTicket, appts }: BillingProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--suite-gap)" }}>
      <div className="suite-kpi-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
        <div>
          <p className="suite-card-eyebrow">Collected today</p>
          <p style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 900, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{money(paidTotal)}</p>
        </div>
        <div>
          <p className="suite-card-eyebrow">Outstanding</p>
          <p style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 900, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", color: "var(--suite-accent-700)" }}>{money(pendingTotal)}</p>
        </div>
        <div>
          <p className="suite-card-eyebrow">Average ticket</p>
          <p style={{ margin: "10px 0 0", fontSize: 30, fontWeight: 900, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{money(avgTicket)}</p>
        </div>
      </div>

      <section className="suite-card">
        <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
          <p className="suite-card-eyebrow">Point of sale</p>
          <h2 className="suite-card-title">Invoices</h2>
        </div>
        <div className="suite-table-wrap">
          <table className="suite-table">
            <thead><tr><th>Invoice</th><th>Client</th><th>Treatment</th><th style={{ textAlign: "right" }}>Amount</th><th>Payment</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
            <tbody>
              {appts.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-accent-700)" }}>{a.id}</td>
                  <td style={{ fontWeight: 700 }}>{a.clientName}</td>
                  <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>{a.serviceName}</td>
                  <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(a.price)}</td>
                  <td>
                    <span className="suite-badge" style={{ background: a.payTone.bg, color: a.payTone.fg, borderColor: a.payTone.bd }}>{a.paymentStatus}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-flex", gap: 8, justifyContent: "flex-end" }}>
                      {a.paymentStatus !== "Paid" && (
                        <button className="suite-btn suite-btn-primary" style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }} onClick={a.settle}>Take payment</button>
                      )}
                      <button className="suite-btn suite-btn-secondary" style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }} onClick={a.openInvoice}>Receipt</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
