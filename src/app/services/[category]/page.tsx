import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { serviceImage } from "@/data/images";

export function generateStaticParams() {
  return services.map((s) => ({ category: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const service = services.find((s) => s.slug === category);
  if (!service) return {};
  return {
    title: `${service.title} — Jugnu's Salon & Studio`,
    description: service.summary,
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const service = services.find((s) => s.slug === category);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        subtitle={service.summary}
        image={serviceImage(service.slug, 0, 1800)}
      />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <RevealOnScroll direction="left">
            <div
              className="aspect-[4/5] rounded-2xl bg-cover bg-center shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]"
              style={{ backgroundImage: `url(${serviceImage(service.slug, 1, 1000)})` }}
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right">
            <p className="text-ink-soft">{service.description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <Check size={18} className="shrink-0 text-gold-deep" /> {item}
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-8">
              Book This Service
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
