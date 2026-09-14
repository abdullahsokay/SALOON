"use client";

import type { DecoratedStylist, DecoratedTeamUser } from "../SuiteApp";

interface StaffProps {
  roster: DecoratedStylist[];
  teamUsers: DecoratedTeamUser[];
}

export default function Staff({ roster, teamUsers }: StaffProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--suite-gap)" }}>
      <div className="suite-kpi-grid">
        {roster.map((st) => (
          <div key={st.id}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ width: 40, height: 40, flex: "none", background: "var(--suite-text)", color: "#fff", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 800 }}>
                {st.name.charAt(0)}
              </div>
              <button onClick={st.toggle} style={{ border: `1px solid ${st.tone.bd}`, background: st.tone.bg, color: st.tone.fg, cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".09em", padding: "5px 9px" }}>
                {st.status}
              </button>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 15, fontWeight: 800 }}>{st.name}</p>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--suite-neutral-700)" }}>{st.specialty}</p>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--suite-neutral-300)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--suite-neutral-700)" }}>Rating</span>
                <span style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{st.rating}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--suite-neutral-700)" }}>Booked today</span>
                <span style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{st.appointmentsToday}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="suite-card">
        <div style={{ padding: "14px 18px", borderBottom: "2px solid var(--suite-text)" }}>
          <p className="suite-card-eyebrow">Portal</p>
          <h2 className="suite-card-title">Team &amp; access</h2>
        </div>
        <div className="suite-table-wrap">
          <table className="suite-table">
            <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Last active</th><th style={{ textAlign: "right" }}>Access</th></tr></thead>
            <tbody>
              {teamUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700 }}>{u.name}</td>
                  <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>{u.role}</td>
                  <td style={{ fontSize: 13, color: "var(--suite-neutral-800)" }}>{u.email}</td>
                  <td style={{ fontSize: 13, fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-700)" }}>{u.last}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={u.toggle} style={{ border: `1px solid ${u.tone.bd}`, background: u.tone.bg, color: u.tone.fg, cursor: "pointer", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".09em", padding: "5px 9px" }}>
                      {u.access}
                    </button>
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
