import styles from "./MarqueeBanner.module.css";

const words = ["Hair", "Makeup", "Bridal", "Nails", "Facials", "Waxing", "Now Booking September–November"];

export default function MarqueeBanner() {
  const loop = [...words, ...words];
  return (
    <div className="overflow-hidden bg-ink py-5">
      <div className={styles.track}>
        {loop.map((word, i) => (
          <span key={i} className={styles.item}>
            {word} <span className={styles.dot}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
