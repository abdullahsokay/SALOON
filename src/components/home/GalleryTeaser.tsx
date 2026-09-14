import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { site } from "@/data/site";
import { serviceImage } from "@/data/images";

const items = [
  { slug: "bridal", idx: 0, alt: "Bridal look", h: "h-[300px] md:h-[360px]" },
  { slug: "hair", idx: 0, alt: "Hair colour", h: "h-[300px] md:h-[360px]" },
  { slug: "makeup", idx: 0, alt: "Makeup close-up", h: "h-[300px] md:h-[360px]" },
  { slug: "interior", idx: 2, alt: "Studio detail", h: "h-[260px] md:h-[300px]" },
  { slug: "nails", idx: 0, alt: "Nails and skin", h: "h-[260px] md:h-[300px]" },
  { slug: "facials", idx: 1, alt: "Behind the chair", h: "h-[260px] md:h-[300px]" },
];

export default function GalleryTeaser() {
  return (
    <section className="bg-cream px-6 py-24 md:py-32" id="gallery">
      <RevealOnScroll direction="up" className="mx-auto mb-10 max-w-xl text-center md:mb-16">
        <p className="mb-3.5 text-xs font-bold tracking-[0.28em] text-gold-deep uppercase">Studio Moments</p>
        <SplitHeading className="text-[clamp(34px,4.8vw,66px)] leading-[1.04]">Our Gallery</SplitHeading>
        <span className="mx-auto mt-6 block h-px w-[62px] bg-gold" />
      </RevealOnScroll>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <RevealOnScroll
            key={i}
            direction="up"
            delay={i * 0.06}
            className={`relative min-w-0 overflow-hidden border border-line bg-cream-2 ${item.h}`}
          >
            <Image
              src={serviceImage(item.slug, item.idx, 900)}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </RevealOnScroll>
        ))}
      </div>

      <p className="mx-auto mt-9 max-w-xl px-6 text-center text-[15.5px] leading-relaxed text-ink-soft">
        Real client transformations coming soon — follow{" "}
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-gold text-gold-deep"
        >
          {site.instagramHandle}
        </a>{" "}
        for daily inspiration.
      </p>
    </section>
  );
}
