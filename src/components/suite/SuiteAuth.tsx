"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import "@/app/dashboard/suite.css";
import { loginStaff } from "@/lib/actions/auth";

export interface SuiteUser {
  name: string;
  role: string;
}

type Mode = "signin" | "signup" | "forgot";

// Fixed credentials behind the 3 "Demo access" buttons — real seeded STAFF
// rows (see prisma/seed.ts), not a faked client-side session.
const DEMOS: { label: string; email: string }[] = [
  { label: "Manager", email: "admin@jugnusalon.com" },
  { label: "Reception", email: "reception@jugnusalon.com" },
  { label: "Stylist", email: "mahnoor@jugnusalon.com" },
];
const DEMO_PASSWORD = "salon2026";

const TICKER = [
  "Bridal signature makeup",
  "Keratin protein therapy",
  "Balayage & highlights",
  "Hydra-facial 7-step",
  "Gel extensions",
  "Airbrush HD glam",
];

function useCountUp(target: number, durationMs = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export default function SuiteAuth() {
  const [loginState, loginAction, loginPending] = useActionState(loginStaff, undefined);
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("admin@jugnusalon.com");
  const [pwd, setPwd] = useState("salon2026");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("General Manager");
  const [resetSent, setResetSent] = useState(false);
  const [signupNote, setSignupNote] = useState("");

  const visualRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const bookings = useCountUp(14);
  const stylists = useCountUp(4);
  const treatments = useCountUp(8);

  function goto(next: Mode) {
    setMode(next);
    setResetSent(false);
  }

  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const g = gridRef.current;
    if (!g) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    g.style.transform = `translate(${(nx * -18).toFixed(1)}px, ${(ny * -14).toFixed(1)}px)`;
  }

  function resetTilt() {
    if (gridRef.current) gridRef.current.style.transform = "translate(0,0)";
  }

  function submitSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupNote(
      `Thanks, ${fullName || "there"} — a request for "${role}" access has been sent. A manager needs to approve new staff accounts from Team & access before you can sign in.`
    );
  }

  function submitReset(e: React.FormEvent) {
    e.preventDefault();
    setResetSent(true);
  }

  return (
    <div className="suite-root">
      <div className="suite-auth">
        <div className="suite-auth-form-side">
          <div style={{ width: "100%", maxWidth: 430, display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="suite-rise" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em" }}>JUGNU&rsquo;S</span>
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em", color: "var(--suite-accent)" }}>SUITE</span>
              </div>
              <div className="suite-rule" />
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--suite-neutral-700)" }}>
                Salon operations &middot; Staff &amp; manager portal
              </p>
            </div>

            <div className="suite-auth-tabs suite-rise">
              <span className="suite-auth-tab-thumb" style={{ transform: `translateX(${mode === "signup" ? "100%" : "0%"})` }} />
              <button type="button" onClick={() => goto("signin")} className={`suite-auth-tab${mode === "signin" ? " is-active" : ""}`}>
                Sign in
              </button>
              <button type="button" onClick={() => goto("signup")} className={`suite-auth-tab${mode === "signup" ? " is-active" : ""}`}>
                Create account
              </button>
            </div>

            {mode === "signin" && (
              <form action={loginAction} className="suite-rise" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label className="suite-label">Work email</label>
                  <div className="suite-field">
                    <input className="suite-input" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@jugnusalon.com" />
                  </div>
                  {loginState?.errors?.email && (
                    <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 700, color: "#b4342a" }}>{loginState.errors.email[0]}</p>
                  )}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                    <label className="suite-label" style={{ marginBottom: 0 }}>Password</label>
                    <button type="button" onClick={() => goto("forgot")} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--suite-accent-700)" }}>
                      Forgot?
                    </button>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="suite-field" style={{ flex: 1 }}>
                    <input
                      className="suite-input"
                      style={{ borderRight: 0 }}
                      name="password"
                      type={showPwd ? "text" : "password"}
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      style={{ flex: "none", width: 76, border: "1px solid var(--suite-neutral-400)", background: "var(--suite-neutral-100)", cursor: "pointer", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--suite-neutral-800)" }}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer", color: "var(--suite-neutral-800)" }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--suite-accent)", margin: 0 }} />
                  <span>Keep me signed in on this terminal</span>
                </label>
                {loginState?.message && (
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#b4342a" }}>{loginState.message}</p>
                )}
                <button type="submit" disabled={loginPending} className="suite-btn suite-btn-primary" style={{ width: "100%", justifyContent: "space-between", minHeight: 50, fontWeight: 800 }}>
                  <span>{loginPending ? "Signing in…" : "Sign in to the suite"}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
              </form>
            )}

            {mode === "signup" && (
              <form onSubmit={submitSignup} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label className="suite-label">Full name</label>
                  <div className="suite-field">
                    <input className="suite-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Zahra Ali" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="suite-label">Work email</label>
                    <div className="suite-field">
                      <input className="suite-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="suite-label">Phone</label>
                    <div className="suite-field">
                      <input className="suite-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300-1234567" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="suite-label">Role requested</label>
                  <div className="suite-field">
                    <select className="suite-input" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>General Manager</option>
                      <option>Head Receptionist</option>
                      <option>Senior Stylist</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="suite-label">Password</label>
                  <div className="suite-field">
                    <input className="suite-input" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                  </div>
                </div>
                {signupNote && (
                  <p style={{ margin: 0, padding: "12px 14px", background: "var(--suite-accent-200)", fontSize: 13, fontWeight: 600, color: "var(--suite-accent-800)" }}>
                    {signupNote}
                  </p>
                )}
                <button type="submit" className="suite-btn suite-btn-primary" style={{ width: "100%", justifyContent: "space-between", minHeight: 50, fontWeight: 800 }}>
                  <span>Request staff account</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
                <p style={{ margin: 0, fontSize: 12, color: "var(--suite-neutral-700)", borderLeft: "2px solid var(--suite-accent)", paddingLeft: 12 }}>
                  New accounts stay read-only until a manager approves them from Team &amp; access.
                </p>
              </form>
            )}

            {mode === "forgot" && (
              <form onSubmit={submitReset} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--suite-neutral-800)" }}>
                  Enter the work email on your staff record. A reset link is valid for 30 minutes.
                </p>
                <div>
                  <label className="suite-label">Work email</label>
                  <div className="suite-field">
                    <input className="suite-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                {resetSent && (
                  <p style={{ margin: 0, padding: "12px 14px", background: "var(--suite-accent-200)", fontSize: 13, fontWeight: 600, color: "var(--suite-accent-800)" }}>
                    Reset link sent. Check the salon inbox.
                  </p>
                )}
                <button type="submit" className="suite-btn suite-btn-primary" style={{ width: "100%", justifyContent: "flex-start", minHeight: 50, fontWeight: 800 }}>
                  Send reset link
                </button>
                <button type="button" onClick={() => goto("signin")} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 700, color: "var(--suite-accent-700)" }}>
                  &larr; Back to sign in
                </button>
              </form>
            )}

            {mode !== "forgot" && (
              <div className="suite-rise" style={{ borderTop: "2px solid var(--suite-text)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--suite-neutral-700)" }}>
                  Demo access
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
                  {DEMOS.map((d) => (
                    <form key={d.email} action={loginAction}>
                      <input type="hidden" name="email" value={d.email} />
                      <input type="hidden" name="password" value={DEMO_PASSWORD} />
                      <button
                        type="submit"
                        disabled={loginPending}
                        className="suite-btn suite-btn-secondary"
                        style={{ width: "100%", justifyContent: "flex-start", fontSize: 12 }}
                      >
                        {d.label}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div ref={visualRef} className="suite-auth-visual" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
          <div ref={gridRef} className="suite-auth-visual-grid suite-tilt" />

          <p className="suite-rise" style={{ position: "relative", margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", color: "#fff", opacity: .85 }}>
            Two branches &middot; Islamabad &amp; Jhelum
          </p>

          <div className="suite-auth-sweep" />

          <div className="suite-rise" style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", margin: "26px 0" }}>
            <div style={{ height: 2, background: "rgba(255,255,255,.9)", transformOrigin: "left", animation: "suiteRuleIn 1s .15s both cubic-bezier(.2,.75,.2,1)" }} />
            <div className="suite-marquee-track">
              <div className="suite-marquee-row">
                {[...TICKER, ...TICKER].map((t, i) => (
                  <span key={i} style={{ display: "flex", gap: 26 }}>
                    <span style={{ flex: "none" }}>{t}</span>
                    <span style={{ flex: "none", opacity: .6 }}>/</span>
                  </span>
                ))}
              </div>
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,.9)", transformOrigin: "left", animation: "suiteRuleIn 1s .25s both cubic-bezier(.2,.75,.2,1)" }} />
            <p className="suite-rise" style={{ margin: "26px 0 0", maxWidth: "24ch", fontSize: 15, lineHeight: 1.5, opacity: .9 }}>
              Bookings, chairs, billing and stock for both branches, on one screen.
            </p>
          </div>

          <h1 style={{ position: "relative", margin: 0, fontSize: 58, lineHeight: 1.02, fontWeight: 900, letterSpacing: "-0.03em", maxWidth: "11ch", display: "flex", flexWrap: "wrap", gap: "0 16px" }}>
            {["One", "desk", "for", "every", "chair."].map((w, i) => (
              <span key={w} className="suite-word">
                <span style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{w}</span>
              </span>
            ))}
          </h1>

          <div className="suite-rise suite-stat-grid">
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{bookings}</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", opacity: .85 }}>Bookings today</div>
              <div className="suite-stat-bar" />
            </div>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{stylists}</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", opacity: .85 }}>Stylists on duty</div>
              <div className="suite-stat-bar" style={{ animationDelay: ".72s" }} />
            </div>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{treatments}</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", opacity: .85 }}>Treatments live</div>
              <div className="suite-stat-bar" style={{ animationDelay: ".84s" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
