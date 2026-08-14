"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const words = ["Glow", "Confidence", "Bridal Look", "Best Self"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(217,173,107,.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(184,134,63,.25), transparent 50%), radial-gradient(circle at 50% 90%, rgba(217,173,107,.2), transparent 55%), linear-gradient(160deg,#221a15,#3a2c22 55%,#1b1512)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
        className="relative z-10 max-w-3xl text-white"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-3 text-xs font-bold tracking-[0.18em] text-gold-light uppercase"
        >
          F-7 Markaz · Islamabad
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(2.6rem,6vw,4.6rem)] font-semibold text-white"
        >
          Reveal Your{" "}
          <span className="relative inline-block align-baseline text-gold-light italic">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="inline-block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-xl text-lg text-white/80"
        >
          Islamabad&apos;s trusted beauty destination for hair, makeup, bridal &amp; skin — crafted by expert stylists, loved by 1,200+ clients.
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Button href="/contact" size="lg">
            Book Your Appointment
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
