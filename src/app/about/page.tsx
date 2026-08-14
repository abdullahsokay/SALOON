import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Leadership from "@/components/home/Leadership";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustBar from "@/components/home/TrustBar";

export const metadata: Metadata = {
  title: "About Us — Jugnu's Salon & Studio",
  description: "The story behind Jugnu's Salon & Studio, Islamabad's trusted beauty destination.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Beauty, Redefined for the Modern You" />

      <section className="px-6 py-20">
        <RevealOnScroll direction="up" className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            Jugnu&apos;s Salon &amp; Studio is Islamabad&apos;s go-to name for premium hair, makeup and skincare —
            trusted by thousands across our F-7 Markaz and Jhelum branches. Our team of expert stylists and bridal
            artists blend international technique with a personal touch, so every visit feels like a
            transformation, not just an appointment.
          </p>
          <p className="mt-4 text-lg text-ink-soft">
            Whether it&apos;s a quick blow-dry or a full bridal package spanning Mehndi to Walima, we treat every
            client with the same level of care that&apos;s earned us a 4.3★ rating across 1,213+ Google reviews.
          </p>
        </RevealOnScroll>
      </section>

      <TrustBar />
      <Leadership />
      <WhyChooseUs />
    </>
  );
}
