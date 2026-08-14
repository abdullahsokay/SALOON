import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import { locations } from "@/data/locations";
import { site } from "@/data/site";

export default function LocationsHours() {
  const main = locations[0];

  return (
    <section className="bg-cream-2 px-6 py-24" id="location">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-12 md:grid-cols-2">
        <RevealOnScroll direction="left">
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Visit Us</p>
          <SplitHeading className="mb-6 text-4xl md:text-5xl">Find Our Studio</SplitHeading>

          <div className="mb-5">
            <strong className="mb-1 block text-xs font-bold tracking-widest text-gold-deep uppercase">Address</strong>
            <p className="text-ink-soft">{main.address}</p>
          </div>
          <div className="mb-5">
            <strong className="mb-1 block text-xs font-bold tracking-widest text-gold-deep uppercase">Hours</strong>
            <p className="text-ink-soft">{main.hours}</p>
          </div>
          <div className="mb-5">
            <strong className="mb-1 block text-xs font-bold tracking-widest text-gold-deep uppercase">Phone</strong>
            <p className="text-ink-soft">{main.phone}</p>
          </div>

          <div className="flex gap-3">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
              <InstagramIcon size={16} /> Instagram
            </a>
            <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
              <FacebookIcon size={16} /> Facebook
            </a>
          </div>

          <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">
            {locations[1].note}
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="right" className="min-h-[380px] overflow-hidden rounded-2xl shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]">
          <iframe
            title="Jugnu's Salon location map"
            src="https://www.google.com/maps?q=Jugnu%27s+Salon+F-7+Markaz+Islamabad&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 380 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
