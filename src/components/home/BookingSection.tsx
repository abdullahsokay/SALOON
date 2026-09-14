import { Phone } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SplitHeading from "@/components/ui/SplitHeading";
import BookingForm from "@/components/home/BookingForm";
import { site } from "@/data/site";

export default function BookingSection() {
  return (
    <section id="booking" className="bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-20">
        <RevealOnScroll direction="left" className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.28em] text-gold-deep uppercase">Reserve Your Slot</p>
          <SplitHeading className="text-[clamp(34px,4.6vw,62px)] leading-[1.06]">
            Book Your
            <br />
            Appointment
          </SplitHeading>
          <p className="mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-ink-soft">
            Tell us what you&apos;re dreaming of and our team will confirm your slot within the hour. For bridal
            packages, mention your event date for priority booking.
          </p>
          <div className="mt-8 flex flex-col gap-px bg-line">
            <a
              href={`tel:${site.phonePrimaryHref}`}
              className="flex items-center gap-3 bg-cream py-4 font-serif text-2xl font-semibold text-ink transition-colors hover:text-gold-deep"
            >
              <Phone size={17} className="text-gold" /> {site.phonePrimary}
            </a>
            <a
              href={`tel:${site.phoneSecondaryHref}`}
              className="flex items-center gap-3 bg-cream py-4 font-serif text-2xl font-semibold text-ink transition-colors hover:text-gold-deep"
            >
              <Phone size={17} className="text-gold" /> {site.phoneSecondary}
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" className="min-w-0">
          <BookingForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
