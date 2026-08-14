import type { Metadata } from "next";
import Link from "next/link";
import { Scissors, Sparkles, Gem, HandHelping, Wand2, ScissorsSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Jugnu's Salon & Studio",
  description: "Hair, makeup, bridal, nails, facials and waxing services at Jugnu's Salon & Studio, F-7 Markaz Islamabad.",
};

const icons: Record<string, React.ElementType> = {
  hair: Scissors,
  makeup: Sparkles,
  bridal: Gem,
  nails: HandHelping,
  facials: Wand2,
  waxing: ScissorsSquare,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Signature Services"
        subtitle="From everyday hair care to full bridal packages — every service is built around you."
      />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.slug] ?? Sparkles;
            return (
              <RevealOnScroll key={service.slug} direction="up" delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full rounded-2xl border border-line bg-white p-7 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]"
                >
                  <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep p-3 text-white">
                    <Icon size={26} />
                  </div>
                  <h2 className="text-xl">{service.title}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{service.summary}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-gold-deep">View details →</span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>
    </>
  );
}
