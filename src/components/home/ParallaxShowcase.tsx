import styles from "./ParallaxShowcase.module.css";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { services } from "@/data/services";

type LayerType = "fore" | "base" | "back" | "deep";

const layerClass: Record<LayerType, string> = {
  fore: styles.layerFore,
  base: styles.layerBase,
  back: styles.layerBack,
  deep: styles.layerDeep,
};

// Layer composition per group, cycled for visual variety (mirrors the
// varied depth combinations in the original Keith Clark demo).
const groups: { slug: string; layers: LayerType[] }[] = [
  { slug: "hair", layers: ["base"] },
  { slug: "makeup", layers: ["back", "base"] },
  { slug: "bridal", layers: ["fore", "base"] },
  { slug: "nails", layers: ["base", "back", "deep"] },
  { slug: "facials", layers: ["fore", "base"] },
  { slug: "waxing", layers: ["back", "base"] },
];

// Placeholder photography from picsum.photos — swap for real studio/client
// photos once available. Each layer gets a distinct image for depth variety.
let imageCounter = 0;
function nextPlaceholderImage() {
  imageCounter += 1;
  return `https://picsum.photos/1200/1400?random=${imageCounter}`;
}

export default function ParallaxShowcase() {
  return (
    <section>
      <div className={styles.intro}>
        <RevealOnScroll direction="up" className="mx-auto max-w-xl">
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Step Inside</p>
          <SplitHeading className="text-4xl md:text-5xl">Explore Our Studio</SplitHeading>
          <p className="mt-4 text-ink-soft">
            A closer look at what we do — hair, makeup, bridal and more, one service at a time.
          </p>
        </RevealOnScroll>
      </div>
      <p className={styles.hint}>Scroll inside this panel to explore →</p>
      <div className={styles.parallax}>
        {groups.map((group) => {
          const service = services.find((s) => s.slug === group.slug)!;
          return (
            <div key={group.slug} className={styles.group}>
              {group.layers.map((layer) => (
                <div
                  key={layer}
                  className={`${styles.layer} ${layerClass[layer]}`}
                  style={{ backgroundImage: `url(${nextPlaceholderImage()})` }}
                >
                  {layer === "base" && (
                    <div className={styles.title}>
                      <div>
                        <p className={styles.eyebrow}>{service.category}</p>
                        <h3 className={styles.heading}>{service.title}</h3>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
