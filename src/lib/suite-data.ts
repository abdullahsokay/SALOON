// Data layer for the Salon Suite dashboard (staff/manager portal).
// Ported from the "Jugnu Salon Suite" design component into plain React state shapes.

export type Category = "Hair" | "Makeup" | "Bridal" | "Skincare" | "Nails";
export type ApptStatus = "Confirmed" | "In Progress" | "Completed" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending";
export type DutyStatus = "Available" | "In Appointment" | "Off Duty";
export type AccessLevel = "Pending" | "Limited" | "Full";
export type Branch = "F-7 Markaz, Islamabad" | "Jhelum Branch";

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  category: Category;
  stylistName: string;
  date: string;
  time: string;
  startH: number;
  endH: number;
  price: number;
  status: ApptStatus;
  paymentStatus: PaymentStatus;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: Category;
  duration: string;
  price: number;
  bookings: number;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  status: DutyStatus;
  rating: number;
  appointmentsToday: number;
}

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  visits: number;
  totalSpent: number;
  badge: string;
  lastVisit: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minAlert: number;
}

export interface TeamUser {
  id: string;
  name: string;
  role: string;
  email: string;
  last: string;
  access: AccessLevel;
}

export interface Approval {
  id: string;
  kind: string;
  title: string;
  detail: string;
}

export interface ActivityEvent {
  time: string;
  text: string;
}

export interface NotifItem {
  id: string;
  title: string;
  body: string;
  time: string;
}

export const TODAY_LABEL = "03 Sep";

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "APT-101", clientName: "Ayesha Malik", clientPhone: "0300-5551234", serviceName: "HD Bridal Makeup & Hair Package", category: "Bridal", stylistName: "Mahnoor Khan", date: "03 Sep", time: "11:30 AM", startH: 11.5, endH: 14, price: 45000, status: "In Progress", paymentStatus: "Paid" },
  { id: "APT-102", clientName: "Zainab Chaudhry", clientPhone: "0321-4448765", serviceName: "Organic Keratin & Gloss Treatment", category: "Hair", stylistName: "Sobia Ahmed", date: "03 Sep", time: "01:00 PM", startH: 13, endH: 15.5, price: 22000, status: "Confirmed", paymentStatus: "Pending" },
  { id: "APT-103", clientName: "Fatima Tariq", clientPhone: "0333-9992211", serviceName: "Hydra-Glow Facial & Manicure", category: "Skincare", stylistName: "Nida Farooq", date: "03 Sep", time: "02:30 PM", startH: 14.5, endH: 16, price: 14500, status: "Confirmed", paymentStatus: "Paid" },
  { id: "APT-104", clientName: "Sana Mir", clientPhone: "0312-7773344", serviceName: "Glam Party Makeup & Blowdry", category: "Makeup", stylistName: "Mahnoor Khan", date: "03 Sep", time: "04:00 PM", startH: 16, endH: 17.5, price: 18000, status: "Confirmed", paymentStatus: "Pending" },
  { id: "APT-105", clientName: "Dr. Rabia Hassan", clientPhone: "0302-1110099", serviceName: "Gel Nail Extensions & Art", category: "Nails", stylistName: "Kiran Shah", date: "02 Sep", time: "05:00 PM", startH: 17, endH: 18.5, price: 8500, status: "Completed", paymentStatus: "Paid" },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  { id: "SRV-01", name: "Royal Bridal Signature Makeup", category: "Bridal", duration: "180 mins", price: 55000, bookings: 9 },
  { id: "SRV-02", name: "Valima / Engagement Glam Makeup", category: "Bridal", duration: "120 mins", price: 38000, bookings: 14 },
  { id: "SRV-03", name: "Airbrush HD Party Makeup", category: "Makeup", duration: "90 mins", price: 18000, bookings: 31 },
  { id: "SRV-04", name: "Organic Keratin Hair Protein Therapy", category: "Hair", duration: "150 mins", price: 24000, bookings: 22 },
  { id: "SRV-05", name: "Balayage & Full Highlights", category: "Hair", duration: "180 mins", price: 28000, bookings: 17 },
  { id: "SRV-06", name: "Hydra-Facial 7-Step Deep Cleanse", category: "Skincare", duration: "75 mins", price: 12500, bookings: 44 },
  { id: "SRV-07", name: "Luxury Gel Polish Pedicure Spa", category: "Nails", duration: "60 mins", price: 6500, bookings: 38 },
  { id: "SRV-08", name: "Rica Waxing Full Body Package", category: "Skincare", duration: "90 mins", price: 14000, bookings: 26 },
];

export const INITIAL_STYLISTS: Stylist[] = [
  { id: "STL-01", name: "Mahnoor Khan", specialty: "Master bridal & HD makeup", status: "In Appointment", rating: 4.9, appointmentsToday: 4 },
  { id: "STL-02", name: "Sobia Ahmed", specialty: "Senior colour & keratin", status: "Available", rating: 4.8, appointmentsToday: 3 },
  { id: "STL-03", name: "Nida Farooq", specialty: "Skincare & derma facials", status: "Available", rating: 4.9, appointmentsToday: 2 },
  { id: "STL-04", name: "Kiran Shah", specialty: "Nail art & gel extensions", status: "Off Duty", rating: 4.7, appointmentsToday: 1 },
];

export const INITIAL_CLIENTS: ClientRecord[] = [
  { id: "CL-01", name: "Ayesha Malik", phone: "0300-5551234", email: "ayesha.m@gmail.com", visits: 8, totalSpent: 185000, badge: "VIP Bridal", lastVisit: "03 Sep 2026" },
  { id: "CL-02", name: "Zainab Chaudhry", phone: "0321-4448765", email: "zainab.c@yahoo.com", visits: 5, totalSpent: 72000, badge: "Gold", lastVisit: "03 Sep 2026" },
  { id: "CL-03", name: "Fatima Tariq", phone: "0333-9992211", email: "fatima.t@outlook.com", visits: 12, totalSpent: 142000, badge: "Gold", lastVisit: "01 Sep 2026" },
  { id: "CL-04", name: "Dr. Rabia Hassan", phone: "0302-1110099", email: "dr.rabia@clinic.pk", visits: 3, totalSpent: 28500, badge: "Regular", lastVisit: "02 Sep 2026" },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "INV-01", name: "L'Oreal Professionnel Keratin Serum 250ml", category: "Hair care", stock: 4, unit: "bottles", minAlert: 5 },
  { id: "INV-02", name: "Studio Foundation Shade 300", category: "Makeup", stock: 12, unit: "tubes", minAlert: 4 },
  { id: "INV-03", name: "Gel Colour Polish, Passion Red", category: "Nails", stock: 18, unit: "bottles", minAlert: 6 },
  { id: "INV-04", name: "Microfoliant Exfoliating Scrub", category: "Skincare", stock: 2, unit: "jars", minAlert: 3 },
  { id: "INV-05", name: "Charcoal Brazilian Wax 800g", category: "Waxing", stock: 9, unit: "cans", minAlert: 4 },
];

export const INITIAL_TEAM: TeamUser[] = [
  { id: "U-1", name: "Fatima Khan", role: "General Manager", email: "admin@jugnusalon.com", last: "Now", access: "Full" },
  { id: "U-2", name: "Zahra Ali", role: "Head Receptionist", email: "reception@jugnusalon.com", last: "12 min ago", access: "Full" },
  { id: "U-3", name: "Mahnoor Khan", role: "Senior Stylist", email: "mahnoor@jugnusalon.com", last: "2 h ago", access: "Limited" },
  { id: "U-4", name: "Bilal Raza", role: "Accounts", email: "accounts@jugnusalon.com", last: "Yesterday", access: "Pending" },
];

export const INITIAL_APPROVALS: Approval[] = [
  { id: "AP-1", kind: "Discount request", title: "15% off bridal package", detail: "APT-101, Ayesha Malik. Requested by Zahra Ali." },
  { id: "AP-2", kind: "Refund", title: "PKR 6,500 nail service", detail: "APT-105 rebooked to 07 Sep. Client asked for reversal." },
  { id: "AP-3", kind: "Access", title: "Bilal Raza, Accounts", detail: "Portal account waiting for manager approval." },
];

export const INITIAL_ACTIVITY: ActivityEvent[] = [
  { time: "14:42", text: "Zahra Ali confirmed APT-104 for Sana Mir." },
  { time: "14:20", text: "Payment of PKR 14,500 received from Fatima Tariq." },
  { time: "13:55", text: "Mahnoor Khan started APT-101, bridal suite." },
  { time: "12:30", text: "Stock alert raised on Microfoliant Scrub, 2 jars left." },
  { time: "11:05", text: "Jhelum branch opened the day with 6 bookings." },
];

export const INITIAL_NOTIFS: NotifItem[] = [
  { id: "N1", title: "Two items below alert level", body: "Keratin serum and microfoliant scrub need reordering.", time: "20 min ago" },
  { id: "N2", title: "Three approvals waiting", body: "A discount, a refund and one access request.", time: "1 h ago" },
  { id: "N3", title: "Kiran Shah marked off duty", body: "One nail booking needs reassignment.", time: "2 h ago" },
];

export interface SalonSettings {
  name: string;
  addr: string;
  phone: string;
  hours: string;
}

export const INITIAL_SETTINGS: SalonSettings = {
  name: "Jugnu's Salon & Studio",
  addr: "F-7 Markaz, Islamabad",
  phone: "(051) 2654443",
  hours: "11:00 - 20:00",
};

export function money(n: number): string {
  return "PKR " + Number(n).toLocaleString("en-US");
}

export function statusTone(status: ApptStatus): { bg: string; fg: string; bd: string } {
  if (status === "In Progress") return { bg: "var(--suite-accent)", fg: "#ffffff", bd: "var(--suite-accent)" };
  if (status === "Completed") return { bg: "var(--suite-text)", fg: "#ffffff", bd: "var(--suite-text)" };
  if (status === "Cancelled") return { bg: "transparent", fg: "var(--suite-neutral-600)", bd: "var(--suite-neutral-400)" };
  return { bg: "transparent", fg: "var(--suite-text)", bd: "var(--suite-text)" };
}

export function dutyTone(status: DutyStatus): { bg: string; fg: string; bd: string } {
  if (status === "Available") return { bg: "var(--suite-accent-200)", fg: "var(--suite-accent-800)", bd: "var(--suite-accent-300)" };
  if (status === "In Appointment") return { bg: "var(--suite-accent)", fg: "#ffffff", bd: "var(--suite-accent)" };
  return { bg: "var(--suite-neutral-200)", fg: "var(--suite-neutral-700)", bd: "var(--suite-neutral-300)" };
}

export function accessTone(access: AccessLevel): { bg: string; fg: string; bd: string } {
  if (access === "Full") return { bg: "var(--suite-text)", fg: "#ffffff", bd: "var(--suite-text)" };
  if (access === "Limited") return { bg: "transparent", fg: "var(--suite-text)", bd: "var(--suite-text)" };
  return { bg: "var(--suite-accent-200)", fg: "var(--suite-accent-800)", bd: "var(--suite-accent-300)" };
}

export const NEXT_STATUS: Partial<Record<ApptStatus, ApptStatus>> = {
  Confirmed: "In Progress",
  "In Progress": "Completed",
};

export const DUTY_CYCLE: DutyStatus[] = ["Available", "In Appointment", "Off Duty"];
export const ACCESS_CYCLE: AccessLevel[] = ["Pending", "Limited", "Full"];
