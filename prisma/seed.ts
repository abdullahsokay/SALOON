// One-time / re-runnable seed for local dev — populates the demo staff
// account, the bookable Service catalog, and the Stylist roster. All writes
// are upserts, so `npm run db:seed` is safe to run again after a schema
// change or a reset database.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Mirrors lib/suite-data.ts's INITIAL_SERVICES — the Suite's own mock catalog
// is the richer, more "real business" price list, so it becomes the seed for
// the one bookable Service table both the Suite and the customer portal read.
const SERVICES = [
  { slug: "royal-bridal-signature-makeup", category: "Bridal", name: "Royal Bridal Signature Makeup", durationMinutes: 180, price: 55000, bookingsCount: 9 },
  { slug: "valima-engagement-glam-makeup", category: "Bridal", name: "Valima / Engagement Glam Makeup", durationMinutes: 120, price: 38000, bookingsCount: 14 },
  { slug: "airbrush-hd-party-makeup", category: "Makeup", name: "Airbrush HD Party Makeup", durationMinutes: 90, price: 18000, bookingsCount: 31 },
  { slug: "organic-keratin-hair-protein-therapy", category: "Hair", name: "Organic Keratin Hair Protein Therapy", durationMinutes: 150, price: 24000, bookingsCount: 22 },
  { slug: "balayage-full-highlights", category: "Hair", name: "Balayage & Full Highlights", durationMinutes: 180, price: 28000, bookingsCount: 17 },
  { slug: "hydra-facial-7-step-deep-cleanse", category: "Skincare", name: "Hydra-Facial 7-Step Deep Cleanse", durationMinutes: 75, price: 12500, bookingsCount: 44 },
  { slug: "luxury-gel-polish-pedicure-spa", category: "Nails", name: "Luxury Gel Polish Pedicure Spa", durationMinutes: 60, price: 6500, bookingsCount: 38 },
  { slug: "rica-waxing-full-body-package", category: "Skincare", name: "Rica Waxing Full Body Package", durationMinutes: 90, price: 14000, bookingsCount: 26 },
];

// Mirrors lib/suite-data.ts's INITIAL_STYLISTS.
const STYLISTS = [
  { name: "Mahnoor Khan", specialty: "Master bridal & HD makeup", branch: "F-7 Markaz, Islamabad", status: "In Appointment", rating: 4.9 },
  { name: "Sobia Ahmed", specialty: "Senior colour & keratin", branch: "F-7 Markaz, Islamabad", status: "Available", rating: 4.8 },
  { name: "Nida Farooq", specialty: "Skincare & derma facials", branch: "F-7 Markaz, Islamabad", status: "Available", rating: 4.9 },
  { name: "Kiran Shah", specialty: "Nail art & gel extensions", branch: "F-7 Markaz, Islamabad", status: "Off Duty", rating: 4.7 },
];

// Mirrors lib/suite-data.ts's INITIAL_INVENTORY.
const INVENTORY = [
  { name: "L'Oreal Professionnel Keratin Serum 250ml", category: "Hair care", stock: 4, unit: "bottles", minAlert: 5 },
  { name: "Studio Foundation Shade 300", category: "Makeup", stock: 12, unit: "tubes", minAlert: 4 },
  { name: "Gel Colour Polish, Passion Red", category: "Nails", stock: 18, unit: "bottles", minAlert: 6 },
  { name: "Microfoliant Exfoliating Scrub", category: "Skincare", stock: 2, unit: "jars", minAlert: 3 },
  { name: "Charcoal Brazilian Wax 800g", category: "Waxing", stock: 9, unit: "cans", minAlert: 4 },
];

// Mirrors lib/suite-data.ts's INITIAL_TEAM / SuiteAuth's 3 demo buttons —
// one real seeded account per demo role so "Demo access" signs into an
// actual session instead of faking one client-side.
const STAFF = [
  { name: "Fatima Khan", email: "admin@jugnusalon.com", phone: "0300-1112223", password: "salon2026" },
  { name: "Zahra Ali", email: "reception@jugnusalon.com", phone: "0300-1112224", password: "salon2026" },
  { name: "Mahnoor Khan", email: "mahnoor@jugnusalon.com", phone: "0300-1112225", password: "salon2026" },
];

async function main() {
  for (const s of SERVICES) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`Seeded ${SERVICES.length} services.`);

  for (const st of STYLISTS) {
    const existing = await prisma.stylist.findFirst({ where: { name: st.name } });
    if (existing) {
      await prisma.stylist.update({ where: { id: existing.id }, data: st });
    } else {
      await prisma.stylist.create({ data: st });
    }
  }
  console.log(`Seeded ${STYLISTS.length} stylists.`);

  for (const item of INVENTORY) {
    const existing = await prisma.inventoryItem.findFirst({ where: { name: item.name } });
    if (existing) {
      await prisma.inventoryItem.update({ where: { id: existing.id }, data: item });
    } else {
      await prisma.inventoryItem.create({ data: item });
    }
  }
  console.log(`Seeded ${INVENTORY.length} inventory items.`);

  for (const staff of STAFF) {
    const passwordHash = await bcrypt.hash(staff.password, 10);
    await prisma.user.upsert({
      where: { email: staff.email },
      update: { name: staff.name, phone: staff.phone, role: "STAFF" },
      create: { name: staff.name, email: staff.email, phone: staff.phone, passwordHash, role: "STAFF" },
    });
  }
  console.log(`Seeded ${STAFF.length} staff accounts (demo password: "salon2026").`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
