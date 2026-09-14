// Package / loyalty catalog — static marketing content, same reasoning as
// data/services.ts vs the DB Service table (see prisma/schema.prisma).
// Ownership (`UserPackage`) is the only part of this that's in the database.
export type PackageDef = {
  slug: string;
  tag: string;
  title: string;
  price: string;
  per: string;
  desc: string;
  bullets: string[];
  cta: string;
  dark?: boolean;
};

export const packages: PackageDef[] = [
  {
    slug: "member",
    tag: "Membership",
    title: "Monthly membership",
    price: "PKR 12,000",
    per: "/ month",
    desc: "For the regulars. Pays for itself in two visits.",
    bullets: ["Unlimited blow-dry & styling", "20% off every other service", "Priority slots on weekends"],
    cta: "Start membership",
    dark: true,
  },
  {
    slug: "facial6",
    tag: "Prepaid sessions",
    title: "Facial six-pack",
    price: "PKR 33,000",
    per: "save PKR 6,000",
    desc: "Six deep-cleanse facials to use whenever you like, valid one year.",
    bullets: ["6 × Hydra-Facial 7-Step", "Transferable to family", "No expiry pressure"],
    cta: "Buy package",
  },
  {
    slug: "bridal",
    tag: "Bundle",
    title: "Bridal bundle",
    price: "PKR 95,000",
    per: "4 events",
    desc: "Trial, mehndi, baraat and walima with one lead artist.",
    bullets: ["Dedicated artist for all events", "Free trial session", "Two guest makeups included"],
    cta: "Enquire",
  },
  {
    slug: "gift",
    tag: "Gift card",
    title: "Gift card",
    price: "From PKR 2,000",
    per: "any amount",
    desc: "Sent by WhatsApp with a code. Spendable on anything.",
    bullets: ["Any value from PKR 2,000", "Valid 12 months", "Works at both branches"],
    cta: "Send a gift card",
  },
  {
    slug: "refer",
    tag: "Referral",
    title: "Refer & earn",
    price: "PKR 500",
    per: "each way",
    desc: "Your friend saves on their first visit, you get credit.",
    bullets: ["PKR 500 off for them", "PKR 500 credit for you", "No cap on referrals"],
    cta: "Get my code",
  },
  {
    slug: "flash",
    tag: "Limited time",
    title: "Weekend colour sale",
    price: "25% off",
    per: "ends Sunday",
    desc: "All colour services this weekend, including balayage.",
    bullets: ["Organic keratin therapy", "Balayage & full highlights", "Book before Sunday 20:00"],
    cta: "Claim discount",
  },
  {
    slug: "points",
    tag: "Loyalty",
    title: "Points on every rupee",
    price: "Free",
    per: "automatic",
    desc: "Earn as you go, redeem against any bill.",
    bullets: ["1 point per PKR 100 spent", "500 points = PKR 500 off", "Never expires"],
    cta: "View my points",
  },
  {
    slug: "birthday",
    tag: "Rewards",
    title: "Birthday month",
    price: "Free",
    per: "members only",
    desc: "A small thank-you in the month you were born.",
    bullets: ["Free threading", "15% off one service", "Add your date to activate"],
    cta: "Add my birthday",
  },
];
