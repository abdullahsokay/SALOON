import { Scissors, Sparkles, Gem, Hand, Droplet, AlignJustify, type LucideIcon } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { services } from "@/data/services";

const icons: Record<string, LucideIcon> = {
  hair: Scissors,
  makeup: Sparkles,
  bridal: Gem,
  nails: Hand,
  facials: Droplet,
  waxing: AlignJustify,
};

export default function ServicesGrid() {
  return (
    <section className="bg-cream px-6 py-24 md:py-32" id="services">
      <RevealOnScroll direction="up" className="mx-auto mb-12 max-w-xl text-center md:mb-16">
        <p className="mb-3.5 text-xs font-bold tracking-[0.28em] text-gold-deep uppercase">What We Offer</p>
        <SplitHeading className="text-[clamp(34px,4.8vw,66px)] leading-[1.04]">Signature Services</SplitHeading>
        <span className="mx-auto mt-6 block h-px w-[62px] bg-gold" />
      </RevealOnScroll>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.slug] ?? Sparkles;
          return (
            <RevealOnScroll
              key={service.slug}
              direction="up"
              delay={i * 0.08}
              className="group bg-cream p-7 transition-[background,transform] duration-300 ease-out hover:-translate-y-1 hover:bg-white md:p-11"
            >
              <div className="mb-6 grid size-[52px] place-items-center border border-gold text-gold-deep">
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className="font-serif text-[26px] leading-[1.18] font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{service.summary}</p>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
