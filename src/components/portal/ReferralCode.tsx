"use client";

import { useState } from "react";

// The referral code is meant to be shared — a bare `<p>` made people
// select-and-copy by hand. Click now copies it and flashes a confirmation.
export default function ReferralCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="portal-choice"
      style={{
        marginTop: 18, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 26, fontWeight: 700, letterSpacing: ".04em",
        background: "var(--portal-ink)", color: "#f3f2f2", padding: "12px 16px", display: "inline-flex", alignItems: "center", gap: 12,
        border: "2px solid transparent", cursor: "pointer",
      }}
    >
      {code}
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: copied ? "#8fe0a8" : "#9b9797" }}>
        {copied ? "Copied ✓" : "Tap to copy"}
      </span>
    </button>
  );
}
