export type Service = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "hair",
    category: "Hair",
    title: "Hair Styling & Care",
    summary: "Cuts, coloring, keratin, smoothening & treatments tailored to your hair type.",
    description:
      "From precision cuts to full color transformations, our stylists blend international technique with an eye for what actually suits you — not just the trend of the week.",
    items: ["Haircut & styling", "Global & balayage color", "Keratin & smoothening", "Deep-repair treatments", "Blow-dry & styling"],
  },
  {
    slug: "makeup",
    category: "Makeup",
    title: "Makeup Services",
    summary: "Party, HD & editorial makeup by artists who know how to make you glow.",
    description:
      "Whether it's a formal event or a full glam night out, our makeup artists work with skin-safe, long-wear products suited to Islamabad's climate and photography lighting alike.",
    items: ["Party makeup", "HD & airbrush makeup", "Editorial / photoshoot makeup", "Draping & hairstyling add-ons"],
  },
  {
    slug: "bridal",
    category: "Bridal",
    title: "Bridal Packages",
    summary: "Mehndi to Walima — complete bridal looks, on-site or outstation.",
    description:
      "Our bridal team handles every function from Mehndi to Baraat to Walima, with trial sessions available so your final look is never a surprise. Outstation services available across Pakistan.",
    items: ["Full bridal package (Mehndi–Baraat–Walima)", "Trial makeup session", "Hairstyling & draping", "Outstation services"],
  },
  {
    slug: "nails",
    category: "Nails",
    title: "Manicure & Pedicure",
    summary: "Nail care, gel polish & spa-style hand and foot treatments.",
    description:
      "Relaxing, spa-style manicure and pedicure treatments with gel and classic polish options, finished with proper cuticle and skin care — not just polish.",
    items: ["Classic manicure / pedicure", "Gel polish", "Spa hand & foot treatment", "Nail art (on request)"],
  },
  {
    slug: "facials",
    category: "Facials",
    title: "Facials & Skin Care",
    summary: "Deep cleansing, brightening & anti-aging facials for radiant skin.",
    description:
      "Skin treatments designed around your skin type, from deep-cleansing facials to brightening and anti-aging protocols using premium, dermatologically safe products.",
    items: ["Deep cleansing facial", "Brightening facial", "Anti-aging treatment", "Pre-bridal skin prep"],
  },
  {
    slug: "waxing",
    category: "Waxing",
    title: "Waxing & Threading",
    summary: "Precise, gentle hair removal for smooth, flawless skin.",
    description:
      "Full-body waxing and precision threading in a clean, private studio environment, done efficiently without compromising on comfort.",
    items: ["Full body waxing", "Eyebrow & face threading", "Sensitive-skin friendly options"],
  },
];

export const serviceCategories = Array.from(new Set(services.map((s) => s.category)));
