"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const COLORS = ["#ec3013", "#201e1d", "#ff9783", "#b4342a", "#9b9797"];

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  dx: number;
  color: string;
  size: number;
}

// One-shot celebratory burst for the booking-confirmed screen — pure
// CSS-driven fall (no canvas, no dependency), skipped entirely under
// prefers-reduced-motion.
export default function Confetti({ count = 70 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const spawn = () =>
      setPieces(
        Array.from({ length: count }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2.4 + Math.random() * 1.6,
          dx: (Math.random() - 0.5) * 180,
          color: COLORS[i % COLORS.length],
          size: 6 + Math.random() * 7,
        }))
      );
    spawn();
  }, [count]);

  if (pieces.length === 0) return null;

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 200 }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={
            {
              position: "absolute",
              top: -20,
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.4,
              background: p.color,
              animation: `portalConfettiFall ${p.duration}s ${p.delay}s cubic-bezier(.25,.46,.45,.94) forwards`,
              "--dx": `${p.dx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
