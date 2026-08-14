import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { leadership, leadershipConfirmed } from "@/data/leadership";

export default function Leadership() {
  if (!leadershipConfirmed) {
    // Intentionally generic — no names are published here until the client
    // confirms who should be featured. See src/data/leadership.ts.
    return (
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <RevealOnScroll direction="left">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cream-2 to-gold-light shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]" />
          </RevealOnScroll>
          <RevealOnScroll direction="right">
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Meet the Team</p>
            <h2 className="text-4xl md:text-5xl">Led by People Who Care About Your Look</h2>
            <p className="mt-5 max-w-md text-ink-soft">
              {leadership[0].bio} We&apos;d rather leave this section honest and incomplete than publish names we
              haven&apos;t confirmed.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return null;
}
