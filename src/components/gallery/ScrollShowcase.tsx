import Link from "next/link";
import styles from "./ScrollShowcase.module.css";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

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
              <div
                className={styles.mediaInner}
                style={{ backgroundImage: `url(${serviceImage(service.slug, 2, 1400)})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
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
