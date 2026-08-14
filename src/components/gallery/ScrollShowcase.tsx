import Link from "next/link";
import styles from "./ScrollShowcase.module.css";
import { services } from "@/data/services";

const gradients = [
  "linear-gradient(150deg,#e8c99a,#b8863f)",
  "linear-gradient(150deg,#f2ebe1,#d9ad6b)",
  "linear-gradient(150deg,#3a2c22,#8a611f)",
  "linear-gradient(150deg,#d9ad6b,#4a3f39)",
  "linear-gradient(150deg,#8a611f,#221a15)",
  "linear-gradient(150deg,#f2ebe1,#b8863f)",
];

// CSS scroll-driven animation (animation-timeline/view-timeline) — Chrome/Edge
// today, other browsers just render the panels statically without the
// scroll-linked motion. No JS is involved; everything below is plain CSS.
export default function ScrollShowcase() {
  return (
    <div className={styles.showcase}>
      <main>
        {services.map((service, i) => (
          <article key={service.slug} className={styles.article} style={{ "--index": i } as React.CSSProperties}>
            <div className={styles.media}>
              <div className={styles.mediaInner} style={{ background: gradients[i % gradients.length] }} />
            </div>
            <div className={styles.info}>
              <p className={styles.eyebrow}>{service.category}</p>
              <h2 className={styles.heading}>{service.title}</h2>
              <p className={styles.copy}>{service.summary}</p>
              <Link href={`/services/${service.slug}`} className={styles.cta}>
                View Service
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
