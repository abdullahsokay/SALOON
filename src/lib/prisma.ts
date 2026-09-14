import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Prisma 7 requires an explicit driver adapter — there is no built-in direct
// connection anymore. @libsql/client ships prebuilt native bindings (unlike
// better-sqlite3, which needs node-gyp), and it supports a local SQLite file
// directly via a file: URL, so no remote Turso account is needed.
const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });

// Standard Next.js dev-mode singleton: without this, every hot-reload of a
// module that imports `prisma` would open a fresh PrismaClient (and a fresh
// database connection), quickly hitting connection limits.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
