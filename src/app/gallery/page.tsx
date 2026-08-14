import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ScrollShowcase from "@/components/gallery/ScrollShowcase";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery — Jugnu's Salon & Studio",
  description: "A look inside Jugnu's Salon & Studio, Islamabad.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio Moments"
        title="Our Gallery"
        subtitle="Scroll through our signature services — placeholder visuals for now, real client transformations are on the way."
      />
      <ScrollShowcase />
      <p className="mx-auto max-w-xl px-6 py-16 text-center text-sm text-ink-soft">
        Follow{" "}
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-gold-deep">
          {site.instagramHandle}
        </a>{" "}
        for real daily transformations and behind-the-scenes looks.
      </p>
    </>
  );
}
