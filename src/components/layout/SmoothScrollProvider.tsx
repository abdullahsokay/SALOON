"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Smooth-scroll to in-page anchors (the ScrollToPlugin use case) via
    // Lenis's own scrollTo instead of a second GSAP scroll animator, so only
    // one engine ever drives the scroll position.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href*='#']");
      if (!anchor) return;
      const url = new URL((anchor as HTMLAnchorElement).href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
    }
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { offset: -90, immediate: true }));
      }
    }

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
