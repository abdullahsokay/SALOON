"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MapPin, Clock, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Visit Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden bg-ink text-cream-2 text-[0.78rem] md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-7 px-6 py-2">
          <span className="flex items-center gap-1.5 opacity-90">
            <Phone size={13} className="text-gold-light" /> {site.phonePrimary}
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <MapPin size={13} className="text-gold-light" /> F-7 Markaz, Islamabad
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <Clock size={13} className="text-gold-light" /> {site.hours}
          </span>
          <span className="ml-auto flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-gold-light">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {site.googleRating} · {site.googleReviewCount} Google reviews
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="font-serif text-2xl font-semibold whitespace-nowrap">
            Jugnu<span className="text-gold">&apos;s</span>{" "}
            <em className="font-serif text-[1.05rem] font-medium not-italic text-ink-soft">Salon &amp; Studio</em>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-ink-soft transition-colors hover:text-gold-deep">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href={`tel:${site.phonePrimaryHref}`} variant="ghost">
              Call Now
            </Button>
            <Button href="/contact">Book Appointment</Button>
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center rounded-full p-2 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2.5 text-sm font-semibold text-ink-soft hover:bg-cream-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button href="/contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
                  Book Appointment
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
