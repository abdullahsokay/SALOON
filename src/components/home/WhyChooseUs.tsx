import { UserCheck, ShieldCheck, Wand2, MapPinned } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";

const points = [
  { icon: UserCheck, title: "Expert Professionals", copy: "Certified stylists and makeup artists trained in international technique." },
  { icon: ShieldCheck, title: "Top-Quality Products", copy: "Premium, skin-safe products chosen for Islamabad's climate, not just the label." },
  { icon: Wand2, title: "Customized Services", copy: "Every look is built around you — not a one-size-fits-all package." },
  { icon: MapPinned, title: "Convenient Locations", copy: "Studios in Islamabad and Jhelum, with outstation bridal service across Pakistan." },
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-24">
      <RevealOnScroll direction="up" className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Why Jugnu&apos;s</p>
        <SplitHeading className="text-4xl md:text-5xl">Why Choose Us</SplitHeading>
      </RevealOnScroll>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <RevealOnScroll key={p.title} direction="up" delay={i * 0.08} className="rounded-2xl border border-line bg-white p-7">
            <p.icon size={28} className="mb-4 text-gold-deep" />
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{p.copy}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
