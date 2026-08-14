"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { Observer } from "@/lib/gsap";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  function go(delta: number) {
    setDirection(delta);
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  // Swipe/drag to advance — GSAP Observer normalizes touch, mouse-drag and
  // trackpad wheel gestures into one API instead of wiring up separate
  // touchstart/mousedown handlers.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // onDragEnd (rather than onLeft/onRight) so one swipe advances exactly
    // one slide, even if the pointer travels past the threshold mid-drag.
    const observer = Observer.create({
      target: el,
      type: "touch,pointer",
      dragMinimum: 20,
      onDragEnd: (self) => {
        const dx = self.x - self.startX;
        if (Math.abs(dx) < 20) return;
        go(dx < 0 ? 1 : -1);
      },
    });
    return () => observer.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = testimonials[index];

  return (
    <section className="px-6 py-24">
      <RevealOnScroll direction="up" className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Client Love</p>
        <SplitHeading className="text-4xl md:text-5xl">1,213+ Five-Star Stories</SplitHeading>
      </RevealOnScroll>

      <div ref={trackRef} className="mx-auto flex max-w-2xl items-center gap-4 touch-pan-y">
        <button
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="hidden shrink-0 rounded-full border border-line p-2 text-ink-soft transition-colors hover:bg-cream-2 sm:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative min-h-[220px] flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-2xl border border-line bg-white p-8 text-center"
            >
              <div className="mb-3 flex justify-center gap-0.5 text-gold-deep">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-ink-soft">&quot;{t.quote}&quot;</p>
              <strong className="mt-4 block text-sm">— {t.role}</strong>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="hidden shrink-0 rounded-full border border-line p-2 text-ink-soft transition-colors hover:bg-cream-2 sm:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold-deep" : "w-2 bg-line"}`}
          />
        ))}
      </div>
    </section>
  );
}
