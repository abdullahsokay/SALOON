import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink px-6 pt-16 pb-6 text-white/75">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="font-serif text-2xl font-semibold text-white">
            Jugnu<span className="text-gold-light">&apos;s</span>{" "}
            <em className="font-serif text-[1.05rem] font-medium not-italic text-white/60">Salon &amp; Studio</em>
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Islamabad&apos;s premium destination for hair, makeup, bridal &amp; skin care.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-gold-light uppercase">Explore</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Visit Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-gold-light uppercase">Contact</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <a href={`tel:${site.phonePrimaryHref}`}>{site.phonePrimary}</a>
            <Link href="/contact">F-7 Markaz, Islamabad</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-gold-light uppercase">Follow</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-7xl pt-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Jugnu&apos;s Salon &amp; Studio. Concept demo built for pitch purposes.
      </p>
    </footer>
  );
}
