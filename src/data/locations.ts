// Only the F-7 Markaz branch has a verified address/phone/hours (from the
// real Google Business listing). The spec this project was briefed from
// mentioned an "I-8 Islamabad" branch — that does not match what we verified
// and is not used here. jugnusalon.com's own meta description confirms a
// Jhelum branch exists, but gives no address for it, so it's listed without
// invented street details pending client confirmation.
export type Location = {
  city: string;
  name: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  mapQuery: string | null;
  note?: string;
};

export const locations: Location[] = [
  {
    city: "Islamabad",
    name: "F-7 Markaz Studio",
    address: "Jinnah Super Market, Bhittai Rd, F-7 Markaz, Islamabad",
    phone: "(051) 2654443 · (051) 2654442",
    hours: "Every day · 10:30 AM – 8:00 PM",
    mapQuery: "Jugnu's Salon F-7 Markaz Islamabad",
  },
  {
    city: "Jhelum",
    name: "Jhelum Studio",
    address: null,
    phone: null,
    hours: null,
    mapQuery: null,
    note: "Address, phone & hours pending confirmation — call the F-7 studio for details.",
  },
];
