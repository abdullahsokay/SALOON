import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import FlipCard from "@/components/ui/FlipCard";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

const hues: Record<string, number> = {
  hair: 35,
  makeup: 42,
  bridal: 28,
  nails: 45,
  facials: 38,
  waxing: 32,
};

const featured = services.filter((s) => ["hair", "makeup", "bridal", "facials"].includes(s.slug));

export default function ServicesGrid() {
  return (
    <section className="bg-cream-2 px-6 py-24" id="services">
      <RevealOnScroll direction="up" className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">What We Offer</p>
        <SplitHeading className="text-4xl md:text-5xl">Signature Services</SplitHeading>
      </RevealOnScroll>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((service, i) => (
          <RevealOnScroll key={service.slug} direction="up" delay={i * 0.08}>
            <FlipCard
              title={service.title}
              caption={service.category}
              image={serviceImage(service.slug, 0, 600)}
              details={service.items}
              hue={hues[service.slug]}
              bookHref="/contact"
            />
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/services" variant="ghost">
          View All Services
        </Button>
      </div>
    </section>
  );
}
