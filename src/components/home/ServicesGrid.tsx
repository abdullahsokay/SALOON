import { Scissors, Sparkles, Gem, HandHelping } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

const icons: Record<string, React.ElementType> = {
  hair: Scissors,
  makeup: Sparkles,
  bridal: Gem,
  facials: HandHelping,
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
        {featured.map((service, i) => {
          const Icon = icons[service.slug] ?? Sparkles;
          return (
            <RevealOnScroll key={service.slug} direction="up" delay={i * 0.08}>
              <div className="h-full overflow-hidden rounded-2xl border border-line bg-white transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]">
                <div
                  className="h-36 bg-cover bg-center"
                  style={{ backgroundImage: `url(${serviceImage(service.slug, 0, 600)})` }}
                />
                <div className="p-7">
                  <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep p-3 text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{service.summary}</p>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button href="/services" variant="ghost">
          View All Services
        </Button>
      </div>
    </section>
  );
}
