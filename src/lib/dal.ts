import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSession } from "./session";
import { prisma } from "./prisma";

// Memoized per-request: multiple components can call verifySession() during
// the same render without hitting the cookie/JWT decode more than once.
export const verifySession = cache(async () => {
  const session = await readSession();
  if (!session?.userId) return null;
  return session;
});

export const requireCustomer = cache(async () => {
  const session = await verifySession();
  if (!session || session.role !== "CUSTOMER") {
    redirect("/account/login");
  }
  return session;
});

export const requireStaff = cache(async () => {
  const session = await verifySession();
  if (!session || session.role !== "STAFF") {
    redirect("/dashboard/login");
  }
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });
});
