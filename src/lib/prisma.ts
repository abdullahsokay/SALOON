import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires an explicit driver adapter — there is no built-in direct
// connection anymore. PrismaPg wraps `pg` (node-postgres) and pools
// connections itself, which is what you want stacked on top of Supabase's
// own pgbouncer pooler on a serverless platform like Vercel.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

// Standard Next.js dev-mode singleton: without this, every hot-reload of a
// module that imports `prisma` would open a fresh PrismaClient (and a fresh
// database connection), quickly hitting connection limits.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
