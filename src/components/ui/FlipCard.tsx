"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FlipCard.module.css";
import clsx from "clsx";

// 3D flip-card: hover or tab-focus flips it to reveal a Book button.
// Tapping the card does the same via `active` state, since :hover and
// :focus-within alone never trigger on touch devices — without this,
// mobile users could never reach the Book button on the back face.
export default function FlipCard({
  title,
  caption,
  image,
  details,
  hue = 38,
  bookHref = "/contact",
  detailsHref,
}: {
  title: string;
  caption: string;
  image: string;
  details: string[];
  hue?: number;
  bookHref?: string;
  detailsHref?: string;
}) {
  const [active, setActive] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("a")) return; // let links navigate normally
    setActive((a) => !a);
  }

  return (
    <div
      className={clsx(styles.container, active && styles.active)}
      style={{ "--hue": hue } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className={styles.flip}>
        <div className={`${styles.side} ${styles.front}`}>
          <figure className={styles.figure}>
            <img src={image} alt={title} />
            <div className={styles.imgBg} />
            {detailsHref ? (
              <Link href={detailsHref} className={styles.caption}>
                {caption}
              </Link>
            ) : (
              <span className={styles.caption}>{caption}</span>
            )}
          </figure>
          <ul className={styles.details}>
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.side} ${styles.back}`}>
          <figure className={styles.figure}>
            <img src={image} alt="" />
            <div className={styles.imgBg} />
          </figure>
          <Link href={bookHref} className={styles.bookBtn}>
            Book
          </Link>
          <div className={styles.designContainer}>
            <span className={`${styles.design} ${styles.design1}`} />
            <span className={`${styles.design} ${styles.design2}`} />
            <span className={`${styles.design} ${styles.design3}`} />
            <span className={`${styles.design} ${styles.design4}`} />
            <span className={`${styles.design} ${styles.design5}`} />
            <span className={`${styles.design} ${styles.design6}`} />
            <span className={`${styles.design} ${styles.design7}`} />
            <span className={`${styles.design} ${styles.design8}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
