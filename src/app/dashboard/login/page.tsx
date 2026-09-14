import type { Metadata } from "next";
import SuiteAuth from "@/components/suite/SuiteAuth";

export const metadata: Metadata = {
  title: "Staff Sign In — Jugnu's Suite",
};

export default function DashboardLoginPage() {
  return <SuiteAuth />;
}
