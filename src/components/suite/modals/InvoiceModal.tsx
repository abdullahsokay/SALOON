"use client";

import { Appointment, SalonSettings, money } from "@/lib/suite-data";

interface InvoiceModalProps {
  appt: Appointment;
  settings: SalonSettings;
  onClose: () => void;
  onPrint: () => void;
}

export default function InvoiceModal({ appt, settings, onClose, onPrint }: InvoiceModalProps) {
  return (
    <div className="suite-dialog-backdrop">
      <div className="suite-dialog" style={{ width: "min(380px,100%)", padding: 0 }}>
        <div style={{ padding: 20, borderBottom: "2px solid var(--suite-text)" }}>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em" }}>{settings.name}</p>
          <p style={{ margin: "4px 0 0", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".11em", color: "var(--suite-neutral-700)" }}>{settings.addr} &middot; {settings.phone}</p>
          <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--suite-accent-700)" }}>Invoice {appt.id}</p>
        </div>
        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 9, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--suite-neutral-700)" }}>Client</span><span style={{ fontWeight: 700 }}>{appt.clientName}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--suite-neutral-700)" }}>Treatment</span><span style={{ fontWeight: 700, textAlign: "right" }}>{appt.serviceName}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--suite-neutral-700)" }}>Stylist</span><span style={{ fontWeight: 700 }}>{appt.stylistName}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--suite-neutral-700)" }}>Date</span><span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{appt.date} {appt.time}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--suite-neutral-700)" }}>Payment</span><span style={{ fontWeight: 700 }}>{appt.paymentStatus}</span></div>
        </div>
        <div style={{ padding: "16px 20px", borderTop: "2px solid var(--suite-text)", borderBottom: "1px solid var(--suite-neutral-300)", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>Total</span>
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{money(appt.price)}</span>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", gap: 10 }}>
          <button className="suite-btn suite-btn-primary" style={{ flex: 1, justifyContent: "flex-start" }} onClick={onPrint}>Print receipt</button>
          <button className="suite-btn suite-btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
