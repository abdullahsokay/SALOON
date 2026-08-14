"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import clsx from "clsx";

// Splits a heading into lines and reveals them with a staggered slide-up as
// it scrolls into view — a GSAP SplitText technique not used elsewhere on
// this site (other headings just fade/slide as a whole block).
export default function SplitHeading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const split = new SplitText(el, { type: "lines", linesClass: "split-line" });
    gsap.set(split.lines, { display: "block", overflow: "hidden" });
    const inner = split.lines.map((line) => {
      const wrap = document.createElement("span");
      wrap.style.display = "block";
      while (line.firstChild) wrap.appendChild(line.firstChild);
      line.appendChild(wrap);
      return wrap;
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  const Comp = Tag;
  return (
    <Comp ref={ref} className={clsx(className)}>
      {children}
    </Comp>
  );
}
