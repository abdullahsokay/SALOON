"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginCustomer, signupCustomer } from "@/lib/actions/auth";

export default function AccountLoginPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loginState, loginAction, loginPending] = useActionState(loginCustomer, undefined);
  const [signupState, signupAction, signupPending] = useActionState(signupCustomer, undefined);

  return (
    <section className="portal-rise" style={{ maxWidth: 460, margin: "0 auto", padding: "calc(70px + clamp(28px,4vw,56px)) 16px clamp(60px,8vw,110px)" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--portal-accent)" }}>Client Portal</p>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900, letterSpacing: "-.04em" }}>Book &amp; manage your visits</h1>
      </div>

      <div style={{ position: "relative", display: "flex", border: "2px solid var(--portal-ink)", marginBottom: 24, overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "50%",
            background: "var(--portal-ink)",
            transform: tab === "signup" ? "translateX(100%)" : "translateX(0%)",
            transition: "transform 0.35s cubic-bezier(0.65,0,0.35,1)",
          }}
        />
        <button
          type="button"
          onClick={() => setTab("signin")}
          style={{ position: "relative", flex: 1, padding: "14px 12px", cursor: "pointer", fontSize: 13, fontWeight: 800, border: 0, background: "transparent", color: tab === "signin" ? "#f3f2f2" : "var(--portal-mute)" }}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          style={{ position: "relative", flex: 1, padding: "14px 12px", cursor: "pointer", fontSize: 13, fontWeight: 800, border: 0, borderLeft: "2px solid var(--portal-ink)", background: "transparent", color: tab === "signup" ? "#f3f2f2" : "var(--portal-mute)" }}
        >
          Create account
        </button>
      </div>

      {tab === "signin" ? (
        <form key="signin" action={loginAction} className="portal-slide-in-left" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Email" name="email" type="email" placeholder="you@example.com" errors={loginState?.errors?.email} />
          <Field label="Password" name="password" type="password" errors={loginState?.errors?.password} />
          {loginState?.message && <p style={{ fontSize: 13, fontWeight: 700, color: "#b4342a" }}>{loginState.message}</p>}
          <button type="submit" disabled={loginPending} className="portal-btn portal-btn-primary" style={{ marginTop: 6 }}>
            {loginPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : (
        <form key="signup" action={signupAction} className="portal-slide-in-right" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Full name" name="name" placeholder="e.g. Mariam Siddiqui" errors={signupState?.errors?.name} />
          <Field label="Email" name="email" type="email" placeholder="you@example.com" errors={signupState?.errors?.email} />
          <Field label="Phone" name="phone" type="tel" placeholder="0300-1234567" errors={signupState?.errors?.phone} />
          <Field label="Password" name="password" type="password" errors={signupState?.errors?.password} />
          {signupState?.message && <p style={{ fontSize: 13, fontWeight: 700, color: "#b4342a" }}>{signupState.message}</p>}
          <button type="submit" disabled={signupPending} className="portal-btn portal-btn-primary" style={{ marginTop: 6 }}>
            {signupPending ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}

      <p style={{ marginTop: 24, textAlign: "center", fontSize: 13, fontWeight: 600, color: "var(--portal-mute)" }}>
        <Link href="/" style={{ fontWeight: 800, color: "var(--portal-accent)" }}>
          &larr; Back to the salon website
        </Link>
      </p>
    </section>
  );
}

function Field({
  label, name, type = "text", placeholder, errors,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} style={{ display: "block", marginBottom: 6, fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--portal-mute)" }}>
        {label}
      </label>
      <input id={name} name={name} type={type} required placeholder={placeholder} className="portal-input" />
      {errors?.map((e) => (
        <p key={e} style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "#b4342a" }}>{e}</p>
      ))}
    </div>
  );
}
