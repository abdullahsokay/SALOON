"use client";

import { useEffect, useState } from "react";

function label(msLeft: number) {
  const left = Math.max(0, msLeft);
  const h = Math.floor(left / 3600000);
  const m = Math.floor(left / 60000) % 60;
  const s = Math.floor(left / 1000) % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function FlashCountdown() {
  const [text, setText] = useState("");

  useEffect(() => {
    const end = (() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d.getTime() + 2 * 86400000;
    })();
    const tick = () => setText(label(end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p style={{ margin: 0, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 24, fontWeight: 700, letterSpacing: "-.02em", color: "var(--portal-accent)" }}>
      {text || "—:—:—"}
    </p>
  );
}
