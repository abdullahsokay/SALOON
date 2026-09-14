"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(1, "Enter your password."),
});

export async function signupCustomer(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, phone, password } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ["An account with this email already exists."] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash, role: "CUSTOMER" },
  });

  await createSession({ userId: user.id, role: "CUSTOMER" });
  redirect("/account");
}

export async function loginCustomer(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "CUSTOMER") {
    return { message: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: "CUSTOMER" });
  redirect("/account");
}

export async function logoutCustomer() {
  await deleteSession();
  redirect("/account/login");
}

export async function loginStaff(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "STAFF") {
    return { message: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: "STAFF" });
  redirect("/dashboard");
}

export async function logoutStaff() {
  await deleteSession();
  redirect("/dashboard/login");
}
