"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import clsx from "clsx";

type Direction = "up" | "left" | "right";

export default function RevealOnScroll({
  children,
  direction = "up",
  distance = 50,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const from: gsap.TweenVars = { opacity: 0 };
    if (direction === "left") from.x = -distance;
    else if (direction === "right") from.x = distance;
    else from.y = distance;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    return () => ctx.revert();
  }, [direction, distance, delay]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={clsx(className)}>
      {children}
    </Comp>
  );
}
