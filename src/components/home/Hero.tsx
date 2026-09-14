"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { serviceImage } from "@/data/images";

// Split hero, matching the Site.dc.html spec: kicker → 3-line masked
// heading reveal → subtext → two CTAs → a scroll cue, over a Ken-Burns
// background with a left-to-right dark gradient (copy sits over the dark
// side on every viewport width).
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    const bits = root.querySelectorAll<HTMLElement>("[data-hero]");

    const ctx = gsap.context(() => {
      gsap.from(lines, { yPercent: 112, duration: 1.15, ease: "power4.out", stagger: 0.09, delay: 0.15 });
      gsap.from(bits, { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.55 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 animate-[jgKen_22s_ease-in-out_infinite_alternate]">
        <Image
          src={serviceImage("bridal", 1, 1800)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,17,15,.9) 0%, rgba(20,17,15,.72) 45%, rgba(20,17,15,.42) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 text-cream md:py-32">
        <p data-hero className="mb-5 text-xs font-bold tracking-[0.28em] text-gold uppercase">
          F-7 Markaz · Islamabad
        </p>

        <h1 className="max-w-[16ch] font-serif text-[clamp(46px,8.4vw,112px)] leading-[1.0] font-semibold tracking-tight">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              Where Every
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block font-medium text-gold italic">
              Glow
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              Begins
            </span>
          </span>
        </h1>

        <p data-hero className="mt-7 max-w-[52ch] text-[clamp(16px,1.5vw,19px)] leading-relaxed font-normal text-[#ddd2c4]">
          Islamabad&apos;s trusted beauty destination for hair, makeup, bridal &amp; skin — crafted by expert
          stylists, loved by 1,200+ clients.
        </p>

        <div data-hero className="mt-9 flex flex-wrap gap-3.5">
          <Button href="/book" variant="gold" size="lg">
            Book Your Appointment
          </Button>
          <Button href="#services" variant="outline" size="lg">
            Explore Services
          </Button>
        </div>

        <div data-hero className="mt-14 flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#a99b8b] uppercase md:mt-20">
          <span className="block h-[34px] w-px animate-[jgScrollCue_2.1s_ease-in-out_infinite] bg-gradient-to-b from-gold to-transparent" />
          Scroll
        </div>
      </div>
    </section>
  );
}
