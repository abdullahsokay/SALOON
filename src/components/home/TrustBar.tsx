import Counter from "@/components/ui/Counter";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const stats = [
  { value: 4.3, decimals: 1, suffix: "", label: "Google Rating" },
  { value: 1213, decimals: 0, suffix: "+", label: "Happy Reviews" },
  { value: 80.5, decimals: 1, suffix: "K+", label: "Instagram Family" },
  { value: 2, decimals: 0, suffix: "", label: "Branches — Islamabad & Jhelum" },
];

export default function TrustBar() {
  return (
    <section className="bg-ink px-6 py-10 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((s, i) => (
          <RevealOnScroll key={s.label} direction="up" delay={i * 0.08}>
            <strong className="font-serif text-4xl font-semibold text-gold-light">
              <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </strong>
            <p className="mt-1 text-sm text-white/65">{s.label}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
