"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Counter({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = to.toFixed(decimals) + suffix;
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          if (el) el.textContent = obj.val.toFixed(decimals) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [to, decimals, suffix]);

  const initial = "0" + (decimals ? "." + "0".repeat(decimals) : "") + suffix;
  return <span ref={ref}>{initial}</span>;
}
