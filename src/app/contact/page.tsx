import type { Metadata } from "next";
import { MapPinned } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookingForm from "@/components/home/BookingForm";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { serviceImage } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact & Booking — Jugnu's Salon & Studio",
  description: "Book an appointment or visit Jugnu's Salon & Studio, F-7 Markaz Islamabad.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve Your Slot"
        title="Book Your Appointment"
        subtitle="Tell us what you're dreaming of and our team will confirm your slot. For bridal packages, mention your event date for priority booking."
        image={serviceImage("interior", 2, 1800)}
      />

      <section className="px-6 py-20" id="booking">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <RevealOnScroll direction="left">
            <h2 className="text-3xl">Get in Touch</h2>
            <div className="mt-6 flex flex-col gap-2 text-ink-soft">
              <a href={`tel:${site.phonePrimaryHref}`} className="font-bold text-gold-deep">
                {site.phonePrimary}
              </a>
              <a href={`tel:${site.phoneSecondaryHref}`} className="font-bold text-gold-deep">
                {site.phoneSecondary}
              </a>
            </div>
            <div className="mt-8 flex gap-3">
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
                <InstagramIcon size={16} /> Instagram
              </a>
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white">
                <FacebookIcon size={16} /> Facebook
              </a>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right">
            <BookingForm />
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-cream-2 px-6 py-20" id="branches">
        <RevealOnScroll direction="up" className="mx-auto mb-12 max-w-xl text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.18em] text-gold-deep uppercase">Our Studios</p>
          <h2 className="text-4xl md:text-5xl">Visit a Branch</h2>
        </RevealOnScroll>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((loc, i) => (
            <RevealOnScroll key={loc.city} direction="up" delay={i * 0.1} className="overflow-hidden rounded-2xl border border-line bg-white">
              {loc.mapQuery ? (
                <iframe
                  title={`${loc.name} map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-[220px] flex-col items-center justify-center gap-2 bg-cream-2 text-sm text-ink-soft">
                  <MapPinned size={24} className="text-gold-deep/60" strokeWidth={1.5} />
                  Map coming soon
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl">{loc.name}</h3>
                {loc.address && <p className="mt-2 text-sm text-ink-soft">{loc.address}</p>}
                {loc.hours && <p className="mt-1 text-sm text-ink-soft">{loc.hours}</p>}
                {loc.phone && <p className="mt-1 text-sm text-ink-soft">{loc.phone}</p>}
                {loc.note && <p className="mt-3 border-t border-line pt-3 text-sm text-ink-soft">{loc.note}</p>}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
