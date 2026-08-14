import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

const gradients = [
  "from-[#e8c99a] to-[#b8863f]",
  "from-[#f2ebe1] to-[#d9ad6b]",
  "from-[#3a2c22] to-[#8a611f]",
  "from-[#d9ad6b] to-[#4a3f39]",
  "from-[#8a611f] to-[#221a15]",
  "from-[#f2ebe1] to-[#b8863f]",
  "from-[#b8863f] to-[#221a15]",
  "from-[#d9ad6b] to-[#8a611f]",
];

export default function GalleryTeaser() {
  return (
    <section className="bg-cream-2 py-24">
      <RevealOnScroll direction="up" className="mx-auto mb-10 max-w-xl px-6 text-center">
        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Studio Moments</p>
        <SplitHeading className="text-4xl md:text-5xl">Our Gallery</SplitHeading>
      </RevealOnScroll>

      <RevealOnScroll direction="up">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {gradients.map((g, i) => (
            <div
              key={i}
              className={`h-56 w-44 shrink-0 snap-start rounded-2xl bg-gradient-to-br ${g} md:h-64 md:w-52`}
            />
          ))}
        </div>
      </RevealOnScroll>

      <div className="mx-auto mt-6 max-w-xl px-6 text-center">
        <p className="mb-6 text-sm text-ink-soft">
          Real client transformations coming soon — follow{" "}
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-gold-deep">
            {site.instagramHandle}
          </a>{" "}
          for daily inspiration.
        </p>
        <Button href="/gallery" variant="ghost">
          View Full Gallery
        </Button>
      </div>
    </section>
  );
}
