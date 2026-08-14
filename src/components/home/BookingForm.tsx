"use client";

import { useState } from "react";
import { services } from "@/data/services";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        e.currentTarget.reset();
      }}
      className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-8 shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="Full Name" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
        <input required type="tel" placeholder="Phone Number" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required defaultValue="" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold">
          <option value="" disabled>
            Select Service
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
        </select>
        <input required type="date" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      </div>
      <textarea placeholder="Anything we should know? (optional)" rows={3} className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      <button type="submit" className="w-full rounded-full bg-gradient-to-br from-gold-light to-gold-deep px-8 py-4 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(138,97,31,0.55)] transition-transform hover:-translate-y-0.5">
        Request Appointment
      </button>
      {submitted && (
        <p className="text-center text-sm font-semibold text-gold-deep">
          Thank you! This is a demo form — connect it to email/WhatsApp/CRM to go live.
        </p>
      )}
    </form>
  );
}
