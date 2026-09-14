"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Animates the conic-gradient sweep and counts the number up from 0 on
// mount instead of just appearing — the loyalty ring is the first thing a
// returning customer looks at, worth the extra polish.
export default function PointsRing({ points, pointsDeg, pointsHint }: { points: number; pointsDeg: number; pointsHint: string }) {
  const [deg, setDeg] = useState(prefersReducedMotion() ? pointsDeg : 0);
  const [display, setDisplay] = useState(prefersReducedMotion() ? points : 0);

  useEffect(() => {
    // Reduced-motion final values are already the lazy useState initializer
    // above — nothing to animate to, so just skip the rAF loop.
    if (prefersReducedMotion()) return;
    const duration = 900;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDeg(pointsDeg * eased);
      setDisplay(Math.round(points * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [points, pointsDeg]);

  return (
    <div className="portal-rise" style={{ animationDelay: "40ms", background: "var(--portal-paper)", borderTop: "3px solid var(--portal-ink)", padding: "24px 0 26px", display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ width: 74, height: 74, flex: "0 0 74px", borderRadius: "50%", background: `conic-gradient(var(--portal-accent) ${deg}deg, #dcd9d9 0deg)`, display: "grid", placeItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--portal-paper)", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 900, letterSpacing: "-.02em" }}>
          {display}
        </div>
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--portal-mute)" }}>Loyalty points</p>
        <p style={{ margin: "5px 0 0", fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>{pointsHint}</p>
      </div>
    </div>
  );
}
