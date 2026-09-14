// Prisma 7 moved the datasource connection string out of schema.prisma and
// into this versioned config file (the CLI looks specifically for
// `prisma7.config.ts` — confirmed against node_modules/prisma/build/cli.js
// for the version pinned in this project).
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
