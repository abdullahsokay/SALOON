"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-bold tracking-wide transition-shadow duration-300 whitespace-nowrap will-change-transform";

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-br from-gold-light to-gold-deep text-white shadow-[0_12px_24px_-10px_rgba(138,97,31,0.55)] hover:shadow-[0_16px_28px_-8px_rgba(138,97,31,0.6)]",
  outline: "border border-white text-white hover:bg-white/10",
  ghost: "border border-line text-ink hover:bg-cream-2",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

// Magnetic hover: the button nudges toward the cursor within its own
// bounds, snapping back on leave. Desktop-pointer only — skipped on touch
// devices (no hover target to chase) and when reduced motion is requested.
function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.25);
      yTo(relY * 0.3);
    }
    function onLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}

export default function Button({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  const linkRef = useMagnetic<HTMLAnchorElement>();
  const buttonRef = useMagnetic<HTMLButtonElement>();

  if (href) {
    return (
      <Link ref={linkRef} href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={buttonRef} type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
