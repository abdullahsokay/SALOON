"use client";

import { money } from "@/lib/suite-data";
import type { DecoratedAppt } from "../SuiteApp";

interface AppointmentsProps {
  branch: string;
  filteredAppts: DecoratedAppt[];
  openApptModal: () => void;
}

export default function Appointments({ branch, filteredAppts, openApptModal }: AppointmentsProps) {
  return (
    <section className="suite-card">
      <div className="suite-card-head">
        <div>
          <p className="suite-card-eyebrow">{branch}</p>
          <h2 className="suite-card-title">{filteredAppts.length} bookings</h2>
        </div>
        <button className="suite-btn suite-btn-primary" style={{ minHeight: 36, fontSize: 13 }} onClick={openApptModal}>New booking</button>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead>
            <tr>
              <th>Ref</th><th>Client</th><th>Treatment</th><th>Stylist</th><th>Time</th><th style={{ textAlign: "right" }}>Amount</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppts.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-accent-700)" }}>{a.id}</td>
                <td>
                  <span style={{ display: "block", fontWeight: 700 }}>{a.clientName}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--suite-neutral-700)" }}>{a.clientPhone}</span>
                </td>
                <td>
                  <span style={{ display: "block", fontSize: 13 }}>{a.serviceName}</span>
                  <span style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{a.category}</span>
                </td>
                <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>{a.stylistName}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>
                  <span style={{ display: "block", fontWeight: 700 }}>{a.time}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--suite-neutral-700)" }}>{a.date}</span>
                </td>
                <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(a.price)}</td>
                <td>
                  <span className="suite-badge" style={{ background: a.tone.bg, color: a.tone.fg, borderColor: a.tone.bd }}>{a.status}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: 8, justifyContent: "flex-end" }}>
                    {a.nextLabel && (
                      <button className="suite-btn suite-btn-secondary" style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }} onClick={a.advance}>{a.nextLabel}</button>
                    )}
                    <button className="suite-btn suite-btn-secondary suite-btn-icon" style={{ width: 30, height: 30 }} title="Receipt" onClick={a.openInvoice}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
