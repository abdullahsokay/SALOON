import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { serviceImage } from "@/data/images";

const checklist = [
  "Certified senior stylists & makeup artists",
  "Premium, skin-safe international products",
  "Dedicated bridal & outstation teams",
  "Relaxing, private studio environment",
];

export default function About() {
  return (
    <section className="bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
        <RevealOnScroll direction="left" className="relative min-w-0">
          <div className="h-[clamp(360px,42vw,540px)] border border-line bg-white p-3.5">
            <div className="relative h-full w-full overflow-hidden">
              <Image src={serviceImage("interior", 0, 1200)} alt="Jugnu's Salon & Studio interior" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
          <div className="absolute -right-3.5 -bottom-6 max-w-[190px] bg-gold px-6 py-5 text-ink">
            <span className="block font-serif text-xl leading-snug font-semibold">
              Est. Trusted
              <br />
              Beauty House
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.28em] text-gold-deep uppercase">About Us</p>
          <SplitHeading className="text-[clamp(34px,4.6vw,62px)] leading-[1.06]">
            Beauty, Redefined for the Modern You
          </SplitHeading>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-soft">
            Jugnu&apos;s Salon &amp; Studio has been Islamabad&apos;s go-to name for premium hair, makeup and
            skincare — trusted by thousands across our F-7 Markaz and Jhelum branches. Our team of expert
            stylists and bridal artists blend international techniques with a personal touch, so every visit
            feels like a transformation, not just an appointment.
          </p>
          <ul className="mt-7 grid gap-px bg-line">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3.5 bg-cream py-3.5 pl-0.5 text-[15.5px] font-semibold text-[#2b241f]">
                <span className="text-[13px] text-gold">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
