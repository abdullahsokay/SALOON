"use client";

import { money } from "@/lib/suite-data";

export interface OnlineBookingRow {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  stylistName: string;
  branch: string;
  date: string;
  time: string;
  depositAmount: number;
  price: number;
  paymentMethod: string;
}

interface OnlineRequestsProps {
  requests: OnlineBookingRow[];
  onAccept: (req: OnlineBookingRow) => void;
  onDecline: (req: OnlineBookingRow) => void;
  acceptAction: (formData: FormData) => void;
  declineAction: (formData: FormData) => void;
}

export default function OnlineRequests({ requests, onAccept, onDecline, acceptAction, declineAction }: OnlineRequestsProps) {
  if (requests.length === 0) return null;

  return (
    <section className="suite-card" style={{ marginBottom: "var(--suite-gap)" }}>
      <div className="suite-card-head">
        <div>
          <p className="suite-card-eyebrow" style={{ color: "var(--suite-accent-700)" }}>From the website</p>
          <h2 className="suite-card-title">{requests.length} booking request{requests.length === 1 ? "" : "s"} waiting</h2>
        </div>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>
          Advance already collected online
        </p>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead>
            <tr><th>Client</th><th>Requested</th><th style={{ textAlign: "right" }}>Advance</th><th style={{ textAlign: "right" }}>Action</th></tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700 }}>
                  {r.clientName}
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--suite-neutral-700)" }}>{r.serviceName}</span>
                </td>
                <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>
                  {r.date} &middot; {r.time}
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--suite-neutral-700)" }}>{r.stylistName} &middot; {r.branch}</span>
                </td>
                <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
                  {money(r.depositAmount)}
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--suite-neutral-700)" }}>{money(r.price - r.depositAmount)} due &middot; {r.paymentMethod}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: 8, justifyContent: "flex-end" }}>
                    <form action={declineAction}>
                      <input type="hidden" name="bookingId" value={r.id} />
                      <button
                        type="submit"
                        className="suite-btn suite-btn-secondary"
                        style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }}
                        onClick={() => onDecline(r)}
                      >
                        Decline
                      </button>
                    </form>
                    <form action={acceptAction}>
                      <input type="hidden" name="bookingId" value={r.id} />
                      <button
                        type="submit"
                        className="suite-btn suite-btn-primary"
                        style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }}
                        onClick={() => onAccept(r)}
                      >
                        Add to desk
                      </button>
                    </form>
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
