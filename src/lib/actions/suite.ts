"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/dal";

const DUTY_CYCLE = ["Available", "In Appointment", "Off Duty"] as const;
const ACCESS_CYCLE = ["PENDING", "LIMITED", "FULL"] as const;

// Suite roster + the customer portal's stylist picker read the same
// Stylist rows — toggling duty here is what makes a stylist actually
// disappear from (or reappear on) the booking flow's picker.
export async function toggleStylistDuty(stylistId: string) {
  await requireStaff();
  const stylist = await prisma.stylist.findUniqueOrThrow({ where: { id: stylistId } });
  const next = DUTY_CYCLE[(DUTY_CYCLE.indexOf(stylist.status as (typeof DUTY_CYCLE)[number]) + 1) % DUTY_CYCLE.length];
  await prisma.stylist.update({ where: { id: stylistId }, data: { status: next } });
  revalidatePath("/dashboard");
  revalidatePath("/book");
}

export async function restockInventoryItem(itemId: string) {
  await requireStaff();
  await prisma.inventoryItem.update({ where: { id: itemId }, data: { stock: { increment: 5 } } });
  revalidatePath("/dashboard");
}

export async function toggleStaffAccess(userId: string) {
  await requireStaff();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const next = ACCESS_CYCLE[(ACCESS_CYCLE.indexOf(user.accessLevel) + 1) % ACCESS_CYCLE.length];
  await prisma.user.update({ where: { id: userId }, data: { accessLevel: next } });
  revalidatePath("/dashboard");
}
