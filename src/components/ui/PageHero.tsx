"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SplitHeading from "./SplitHeading";

export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-24 text-center text-white">
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(217,173,107,.3), transparent 45%), linear-gradient(160deg,#221a15,#3a2c22 55%,#1b1512)",
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 text-xs font-bold tracking-[0.18em] text-gold-light uppercase"
      >
        {eyebrow}
      </motion.p>
      <SplitHeading as="h1" className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold text-white">
        {title}
      </SplitHeading>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-white/75"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  );
}
