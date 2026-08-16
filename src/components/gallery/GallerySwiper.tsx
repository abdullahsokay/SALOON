"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/parallax";
import styles from "./GallerySwiper.module.css";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

const copy: Record<string, { emphasis: string; rest: string; caption: string }> = {
  hair: { emphasis: "Cut", rest: "Above the Rest.", caption: "Hair Studio · 01" },
  makeup: { emphasis: "Glow", rest: "That Lingers.", caption: "Makeup Studio · 02" },
  bridal: { emphasis: "Vow", rest: "Worth the Wait.", caption: "Bridal Atelier · 03" },
  nails: { emphasis: "Detail", rest: "In Every Touch.", caption: "Nail Bar · 04" },
  facials: { emphasis: "Breath", rest: "Of Fresh Skin.", caption: "Skin Studio · 05" },
  waxing: { emphasis: "Smoothness", rest: "Without Compromise.", caption: "Waxing Studio · 06" },
};

// Vertical Swiper.js scroll-story: mousewheel-driven slides, split image
// panels that shift from sepia/hue-shifted to true color as each slide
// becomes active, with text fading in on a staggered delay. releaseOnEdges
// hands wheel control back to the page once you scroll past the first or
// last slide, so it doesn't trap scrolling like a modal would.
export default function GallerySwiper() {
  return (
    <section className={styles.wrap} data-lenis-prevent>
      <Swiper
        direction="vertical"
        modules={[Mousewheel, Pagination, Parallax]}
        mousewheel={{ releaseOnEdges: true }}
        pagination={{ clickable: true }}
        parallax
        speed={1000}
        grabCursor
        className={styles.swiper}
      >
        {services.map((service) => {
          const c = copy[service.slug];
          return (
            <SwiperSlide key={service.slug} className={styles.slide}>
              <div className={styles.panel} data-swiper-parallax-y="-20%">
                <div
                  className={`${styles.panelInner} ${styles.left}`}
                  style={{ backgroundImage: `url(${serviceImage(service.slug, 0, 900)})` }}
                >
                  <h2 className={styles.heading}>
                    A <em>{c.emphasis}</em>.<br />
                    {c.rest}
                  </h2>
                  <p className={styles.eyebrowCaption}>{c.caption}</p>
                </div>
              </div>
              <div className={styles.panel} data-swiper-parallax-y="35%">
                <div
                  className={`${styles.panelInner} ${styles.right}`}
                  style={{ backgroundImage: `url(${serviceImage(service.slug, 3, 900)})` }}
                >
                  <p className={styles.paragraph}>{service.description}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
