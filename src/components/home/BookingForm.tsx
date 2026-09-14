"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    const message = [
      `Appointment request — ${site.name}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Preferred date: ${date}`,
      notes && `Notes: ${notes}`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappNumber = site.phonePrimaryHref.replace(/[^\d]/g, "");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-8 shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full Name" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
        <input name="phone" required type="tel" placeholder="Phone Number" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select name="service" required defaultValue="" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold">
          <option value="" disabled>
            Select Service
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
        </select>
        <input name="date" required type="date" className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      </div>
      <textarea name="notes" placeholder="Anything we should know? (optional)" rows={3} className="rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      <button type="submit" className="w-full rounded-full bg-gradient-to-br from-gold-light to-gold-deep px-8 py-4 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(138,97,31,0.55)] transition-transform hover:-translate-y-0.5">
        Request Appointment on WhatsApp
      </button>
      {sent && (
        <p className="text-center text-sm font-semibold text-gold-deep">
          Opened WhatsApp with your details — send the message and our team will confirm your slot.
        </p>
      )}
    </form>
  );
}
