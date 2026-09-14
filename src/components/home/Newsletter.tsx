"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Newsletter() {
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!email || email.indexOf("@") < 1) {
      setNote("Please enter a valid email address.");
      return;
    }
    setNote("You're on the list. Offers and new services land in your inbox first.");
    e.currentTarget.reset();
  }

  return (
    <section className="bg-cream px-6 py-16 md:py-24">
      <RevealOnScroll
        direction="up"
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 border border-gold/30 bg-ink p-8 text-cream md:grid-cols-2 md:p-16"
      >
        <div className="min-w-0">
          <p className="mb-3 text-xs font-bold tracking-[0.28em] text-gold uppercase">Stay Glowing</p>
          <h3 className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.1] font-semibold tracking-tight">
            Join the Jugnu&apos;s Community
          </h3>
          <p className="mt-3.5 max-w-[46ch] text-base leading-relaxed text-[#ddd2c4]">
            Be first to know about bridal offers, seasonal deals &amp; new services.
          </p>
        </div>
        <div className="min-w-0">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 basis-[200px] border border-cream/25 bg-cream/[0.06] px-4 py-4 text-[15px] font-medium text-cream outline-none placeholder:text-cream/50 focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold px-7 py-4 text-[14.5px] font-extrabold tracking-wide text-ink transition-colors hover:bg-cream"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-3 min-h-5 text-[13.5px] font-semibold text-gold">{note}</p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
