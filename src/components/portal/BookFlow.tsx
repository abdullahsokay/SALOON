"use client";

import { useMemo, useState, useActionState } from "react";
import { createPortalBooking } from "@/lib/actions/bookings";

export interface PortalService {
  id: string;
  slug: string;
  category: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface PortalStylist {
  id: string;
  name: string;
  specialty: string;
  branch: string;
}

const PAY_METHODS = [
  { id: "jazzcash", label: "JazzCash", note: "Instant" },
  { id: "easypaisa", label: "Easypaisa", note: "Instant" },
  { id: "card", label: "Debit / credit card", note: "Visa · Master" },
  { id: "bank", label: "Bank transfer / Raast", note: "Same day" },
  { id: "cash", label: "Cash at salon", note: "Slot held 30 min" },
];

const DEPOSIT_PCT = 30;
const STEP_TITLES = ["What are we doing today?", "Who should do it?", "When suits you?", "Confirm and hold the slot"];
const STEP_OVERLINES = ["Step 1 of 4 · Services", "Step 2 of 4 · Stylist", "Step 3 of 4 · Date & time", "Step 4 of 4 · Payment"];

function money(n: number) {
  return "PKR " + Math.round(n).toLocaleString("en-US");
}
function durText(m: number) {
  if (m < 60) return m + " min";
  const h = Math.floor(m / 60), r = m % 60;
  return h + "h" + (r ? " " + r + "m" : "");
}
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function dates() {
  const out: Date[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) out.push(new Date(base.getTime() + i * 86400000));
  return out;
}

export default function BookFlow({
  services, stylists, branch, signedIn, initialName, initialPhone,
}: {
  services: PortalService[];
  stylists: PortalStylist[];
  branch: string;
  signedIn: boolean;
  initialName: string;
  initialPhone: string;
}) {
  const [step, setStep] = useState(0);
  // One service per booking — matches the Booking model everywhere else in
  // the system (Suite appointments, online-request accept/decline all
  // assume a single serviceName/price per row), so this is a single choice,
  // not a multi-select cart.
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [stylistId, setStylistId] = useState("any");
  const [dateIdx, setDateIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [pay, setPay] = useState("jazzcash");
  const [notes, setNotes] = useState("");
  const [state, formAction, pending] = useActionState(createPortalBooking, undefined);

  const allDates = useMemo(() => dates(), []);
  const selectedService = useMemo(() => services.find((s) => s.id === selectedServiceId) ?? null, [services, selectedServiceId]);
  const total = selectedService?.price ?? 0;
  const duration = selectedService?.durationMinutes ?? 0;
  const deposit = Math.round((total * DEPOSIT_PCT) / 100 / 50) * 50;

  const stylistOptions = useMemo(
    () => [{ id: "any", name: "Any available stylist", specialty: "Fastest slot", branch: "Both branches" } as PortalStylist, ...stylists],
    [stylists]
  );
  const selectedStylist = stylistOptions.find((s) => s.id === stylistId) ?? stylistOptions[0];

  const slots = useMemo(() => {
    const d = allDates[dateIdx];
    const key = stylistId + "|" + d.toDateString();
    const out: { t: string; free: boolean }[] = [];
    for (let m = 630; m <= 1170; m += 30) {
      const t = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
      const taken = stylistId === "any" ? hash(key + t) % 11 === 0 : hash(key + t) % 4 === 0;
      out.push({ t, free: !taken });
    }
    return out;
  }, [allDates, dateIdx, stylistId]);

  const groups = useMemo(() => {
    const byCategory = new Map<string, PortalService[]>();
    for (const s of services) {
      if (!byCategory.has(s.category)) byCategory.set(s.category, []);
      byCategory.get(s.category)!.push(s);
    }
    return Array.from(byCategory.entries()).map(([name, items]) => ({ name, items }));
  }, [services]);

  function selectService(id: string) {
    setSelectedServiceId(id);
    setSlot(null);
  }

  function next() {
    if (step === 0) { if (!selectedServiceId) return; setStep(1); return; }
    if (step === 1) { setStep(2); return; }
    if (step === 2) { if (!slot) return; setStep(3); return; }
  }
  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  const whenLabel = (() => {
    const d = allDates[dateIdx];
    const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    return day + " · " + (slot ?? "—");
  })();

  let barLabel = "Selected", barValue = "Nothing yet", nextLabel = "Continue", nextOk = true;
  if (step === 0) {
    barValue = selectedService ? `${selectedService.name} · ${money(total)} · ${durText(duration)}` : "Pick a service";
    nextOk = !!selectedServiceId;
    nextLabel = "Choose stylist";
  } else if (step === 1) {
    barLabel = "Stylist"; barValue = selectedStylist.name; nextLabel = "Choose time";
  } else if (step === 2) {
    barLabel = "Time"; barValue = slot ? whenLabel : "Pick a slot"; nextOk = !!slot; nextLabel = "Review & pay";
  } else {
    barLabel = "Advance due now"; barValue = `${money(deposit)} of ${money(total)}`; nextLabel = pending ? "Booking…" : `Pay ${money(deposit)} & book`;
  }

  if (state?.ref) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 16px", textAlign: "center" }}>
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--portal-accent)" }}>Request sent</p>
        <h1 style={{ margin: "0 0 16px", fontSize: 36, fontWeight: 900, letterSpacing: "-.03em" }}>Your slot is held.</h1>
        <p style={{ margin: "0 0 28px", fontSize: 16, lineHeight: 1.5, color: "var(--portal-mute)" }}>
          {money(deposit)} advance received. Our team will confirm within the hour — track it any time from your account.
        </p>
        <a href="/account" className="portal-btn portal-btn-primary">View my bookings</a>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(28px,4vw,56px) clamp(16px,4vw,48px) 160px" }}>
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--portal-accent)" }}>{STEP_OVERLINES[step]}</p>
        <h1 style={{ margin: "0 0 30px", fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>{STEP_TITLES[step]}</h1>

        <div style={{ display: "flex", gap: 2, marginBottom: 40, background: "var(--portal-ink)" }}>
          {["Services", "Stylist", "Date & time", "Confirm"].map((label, i) => (
            <button
              key={label}
              type="button"
              disabled={i > step}
              onClick={() => { if (i < step) setStep(i); }}
              style={{
                flex: 1, minWidth: 0, border: 0, padding: "14px 12px", textAlign: "left", fontSize: 13, fontWeight: 800, letterSpacing: "-.01em",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                cursor: i < step ? "pointer" : "default",
                background: i === step ? "var(--portal-accent)" : i < step ? "var(--portal-ink)" : "var(--portal-paper)",
                color: i <= step ? "var(--portal-paper)" : "var(--portal-mute)",
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        {step === 0 && (
          <div>
            {groups.map((g) => (
              <div key={g.name} style={{ marginBottom: 40 }}>
                <h2 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)", borderBottom: "1px solid var(--portal-line)", paddingBottom: 10 }}>
                  {g.name}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%),1fr))", gap: 12 }}>
                  {g.items.map((s) => {
                    const on = selectedServiceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => selectService(s.id)}
                        style={{
                          textAlign: "left", padding: 18, cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
                          border: `2px solid ${on ? "var(--portal-ink)" : "var(--portal-line)"}`,
                          background: on ? "var(--portal-ink)" : "var(--portal-paper)",
                          color: on ? "var(--portal-paper)" : "var(--portal-ink)",
                        }}
                      >
                        <span style={{
                          width: 26, height: 26, flex: "0 0 26px", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 900,
                          border: `2px solid ${on ? "var(--portal-paper)" : "var(--portal-line)"}`,
                          background: on ? "var(--portal-paper)" : "transparent",
                          color: on ? "var(--portal-ink)" : "var(--portal-mute)",
                        }}>
                          {on ? "✓" : "+"}
                        </span>
                        <span style={{ minWidth: 0, flex: 1 }}>
                          <span style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-.02em" }}>{s.name}</span>
                          <span style={{ display: "block", fontSize: 13, fontWeight: 600, marginTop: 3, color: on ? "#bab6b6" : "var(--portal-mute)" }}>{durText(s.durationMinutes)}</span>
                        </span>
                        <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-.03em", whiteSpace: "nowrap" }}>{money(s.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%),1fr))", gap: 12 }}>
            {stylistOptions.map((t) => {
              const on = stylistId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { setStylistId(t.id); setSlot(null); setStep(2); }}
                  style={{
                    textAlign: "left", padding: 22, cursor: "pointer", display: "flex", flexDirection: "column", gap: 14,
                    border: `2px solid ${on ? "var(--portal-ink)" : "var(--portal-line)"}`,
                    background: on ? "var(--portal-ink)" : "var(--portal-paper)",
                    color: on ? "var(--portal-paper)" : "var(--portal-ink)",
                  }}
                >
                  <span style={{ width: 52, height: 52, background: on ? "var(--portal-accent)" : "#eae9e9", color: on ? "var(--portal-paper)" : "var(--portal-ink)", display: "grid", placeItems: "center", fontSize: 19, fontWeight: 900 }}>
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 19, fontWeight: 800, letterSpacing: "-.025em" }}>{t.name}</span>
                    <span style={{ display: "block", fontSize: 13, fontWeight: 700, marginTop: 4, color: on ? "#ff9783" : "var(--portal-accent)" }}>{t.specialty}</span>
                  </span>
                  <span style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${on ? "#444141" : "var(--portal-line)"}`, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: on ? "#bab6b6" : "var(--portal-mute)", width: "100%" }}>
                    <span>{t.branch}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14, marginBottom: 32 }}>
              {allDates.map((d, i) => {
                const on = i === dateIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setDateIdx(i); setSlot(null); }}
                    style={{
                      flex: "0 0 auto", padding: "12px 16px", cursor: "pointer", textAlign: "center", minWidth: 74,
                      border: `2px solid ${on ? "var(--portal-ink)" : "var(--portal-line)"}`,
                      background: on ? "var(--portal-ink)" : "var(--portal-paper)",
                      color: on ? "var(--portal-paper)" : "var(--portal-ink)",
                    }}
                  >
                    <span style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: ".12em" }}>
                      {i === 0 ? "TODAY" : d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase()}
                    </span>
                    <span style={{ display: "block", fontSize: 24, fontWeight: 900, letterSpacing: "-.03em", marginTop: 3 }}>{String(d.getDate()).padStart(2, "0")}</span>
                    <span style={{ display: "block", fontSize: 11, fontWeight: 700, marginTop: 2, color: on ? "#bab6b6" : "var(--portal-mute)" }}>
                      {d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
            <h2 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)" }}>
              {selectedStylist.name} · {allDates[dateIdx].toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(104px,1fr))", gap: 8 }}>
              {slots.map((s) => {
                const on = slot === s.t;
                return (
                  <button
                    key={s.t}
                    type="button"
                    disabled={!s.free}
                    onClick={() => s.free && setSlot(s.t)}
                    style={{
                      padding: "15px 8px", fontSize: 15, fontWeight: 800, letterSpacing: "-.01em",
                      cursor: s.free ? "pointer" : "not-allowed",
                      textDecoration: s.free ? "none" : "line-through",
                      border: `2px solid ${on ? "var(--portal-accent)" : s.free ? "var(--portal-line)" : "transparent"}`,
                      background: on ? "var(--portal-accent)" : s.free ? "var(--portal-paper)" : "#eae9e9",
                      color: on ? "var(--portal-paper)" : s.free ? "var(--portal-ink)" : "#9b9797",
                    }}
                  >
                    {s.t}
                  </button>
                );
              })}
            </div>
            <p style={{ margin: "20px 0 0", fontSize: 13, fontWeight: 600, color: "var(--portal-mute)" }}>Struck-through times are already taken for this stylist.</p>
          </>
        )}

        {step === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px,100%),1fr))", gap: 32, alignItems: "start" }}>
            <div style={{ border: "2px solid var(--portal-ink)", padding: 26 }}>
              <h2 style={{ margin: "0 0 18px", fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)" }}>Your visit</h2>
              {selectedService && (
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "11px 0", borderBottom: "1px solid var(--portal-line)" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.01em" }}>{selectedService.name}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, whiteSpace: "nowrap" }}>{money(selectedService.price)}</span>
                </div>
              )}
              <Row label="Stylist" value={selectedStylist.name} />
              <Row label="When" value={whenLabel} />
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "8px 0 16px", borderBottom: "2px solid var(--portal-ink)" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--portal-mute)" }}>Chair time</span>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{durText(duration)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "16px 0 0" }}>
                <span style={{ fontSize: 17, fontWeight: 800 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.03em" }}>{money(total)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "10px 0 0" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--portal-accent)" }}>Advance now ({DEPOSIT_PCT}%)</span>
                <span style={{ fontSize: 17, fontWeight: 900, color: "var(--portal-accent)" }}>{money(deposit)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "10px 0 0" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--portal-mute)" }}>Balance at salon</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--portal-mute)" }}>{money(total - deposit)}</span>
              </div>
              <p style={{ margin: "18px 0 0", fontSize: 13, fontWeight: 600, color: "#444141", lineHeight: 1.5 }}>
                You&apos;ll earn {Math.floor(total / 100)} points on this visit. Free cancellation up to 4 hours before.
              </p>
            </div>

            {signedIn ? (
              <div>
                <input type="hidden" name="serviceId" value={selectedServiceId ?? ""} />
                <input type="hidden" name="stylistId" value={stylistId === "any" ? stylists[0]?.id ?? "" : stylistId} />
                <input type="hidden" name="branch" value={branch} />
                <input type="hidden" name="date" value={allDates[dateIdx].toDateString()} />
                <input type="hidden" name="time" value={slot ?? ""} />
                <input type="hidden" name="depositAmount" value={deposit} />

                <h2 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)" }}>Pay the advance with</h2>
                <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: "var(--portal-mute)" }}>
                  Booking as {initialName}{initialPhone ? ` · ${initialPhone}` : ""}
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  {PAY_METHODS.map((p) => {
                    const on = pay === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPay(p.id)}
                        style={{
                          textAlign: "left", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                          border: `2px solid ${on ? "var(--portal-ink)" : "var(--portal-line)"}`,
                          background: on ? "var(--portal-ink)" : "var(--portal-paper)",
                          color: on ? "var(--portal-paper)" : "var(--portal-ink)",
                        }}
                      >
                        <span style={{ width: 18, height: 18, flex: "0 0 18px", borderRadius: "50%", border: `2px solid ${on ? "var(--portal-paper)" : "var(--portal-line)"}`, background: on ? "var(--portal-accent)" : "transparent" }} />
                        <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 800, letterSpacing: "-.01em" }}>{p.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: on ? "#bab6b6" : "var(--portal-mute)" }}>{p.note}</span>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="paymentMethod" value={PAY_METHODS.find((p) => p.id === pay)?.label ?? ""} />

                <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
                  <label style={{ display: "block" }}>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--portal-mute)", marginBottom: 6 }}>Notes for your stylist</span>
                    <input name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" className="portal-input" />
                  </label>
                </div>

                {state?.message && !state.ref && (
                  <p style={{ margin: "14px 0 0", fontSize: 13, fontWeight: 700, color: "#b4342a" }}>{state.message}</p>
                )}
              </div>
            ) : (
              <div style={{ border: "2px dashed var(--portal-line)", padding: 28 }}>
                <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#444141" }}>
                  Sign in to pay the advance and hold this slot — your selections above are safe while you do.
                </p>
                <a href="/account/login" className="portal-btn portal-btn-primary">Sign in or create account</a>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--portal-ink)", color: "#f3f2f2", padding: "16px clamp(16px,4vw,48px)", display: "flex", alignItems: "center", gap: 20, zIndex: 70, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#9b9797" }}>{barLabel}</p>
          <p style={{ margin: "4px 0 0", fontSize: 19, fontWeight: 900, letterSpacing: "-.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{barValue}</p>
        </div>
        {step > 0 && (
          <button type="button" onClick={prev} style={{ background: "none", color: "#f3f2f2", border: "2px solid #605d5d", padding: "14px 22px", cursor: "pointer", fontSize: 14, fontWeight: 800 }}>
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            disabled={!nextOk}
            onClick={next}
            style={{ background: nextOk ? "var(--portal-accent)" : "#444141", color: nextOk ? "#f3f2f2" : "#9b9797", border: 0, padding: "16px 30px", cursor: nextOk ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 800, letterSpacing: "-.01em" }}
          >
            {nextLabel}
          </button>
        ) : signedIn ? (
          <button
            type="submit"
            disabled={pending || !slot}
            style={{ background: "var(--portal-accent)", color: "#f3f2f2", border: 0, padding: "16px 30px", cursor: "pointer", fontSize: 15, fontWeight: 800, letterSpacing: "-.01em" }}
          >
            {nextLabel}
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "8px 0 0" }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: "var(--portal-mute)" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 800 }}>{value}</span>
    </div>
  );
}
