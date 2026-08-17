import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FlipCard from "@/components/ui/FlipCard";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

export const metadata: Metadata = {
  title: "Services — Jugnu's Salon & Studio",
  description: "Hair, makeup, bridal, nails, facials and waxing services at Jugnu's Salon & Studio, F-7 Markaz Islamabad.",
};

const hues: Record<string, number> = {
  hair: 35,
  makeup: 42,
  bridal: 28,
  nails: 45,
  facials: 38,
  waxing: 32,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Signature Services"
        subtitle="From everyday hair care to full bridal packages — every service is built around you. Hover, tap, or tab a card to book."
        image={serviceImage("interior", 0, 1800)}
      />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <RevealOnScroll key={service.slug} direction="up" delay={(i % 3) * 0.08}>
              <FlipCard
                title={service.title}
                caption={service.category}
                image={serviceImage(service.slug, 0, 700)}
                details={service.items}
                hue={hues[service.slug]}
                bookHref="/contact"
                detailsHref={`/services/${service.slug}`}
              />
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
