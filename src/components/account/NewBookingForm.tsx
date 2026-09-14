"use client";

import { useActionState } from "react";
import { createBooking } from "@/lib/actions/bookings";
import { services } from "@/data/services";
import { locations } from "@/data/locations";

export default function NewBookingForm() {
  const [state, action, pending] = useActionState(createBooking, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-25px_rgba(27,21,18,0.35)]">
      <h3 className="text-xl">Book a new appointment</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-wider text-ink-soft uppercase">Treatment</label>
          <select name="serviceSlug" required defaultValue="" className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold">
            <option value="" disabled>
              Select a treatment
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {state?.errors?.service?.map((e) => (
            <p key={e} className="mt-1 text-xs font-semibold text-red-600">{e}</p>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-wider text-ink-soft uppercase">Branch</label>
          <select name="branch" required defaultValue={locations[0].city} className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold">
            {locations.map((l) => (
              <option key={l.city} value={l.city}>
                {l.name}
              </option>
            ))}
          </select>
          {state?.errors?.branch?.map((e) => (
            <p key={e} className="mt-1 text-xs font-semibold text-red-600">{e}</p>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-wider text-ink-soft uppercase">Date</label>
          <input name="date" type="date" required className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
          {state?.errors?.date?.map((e) => (
            <p key={e} className="mt-1 text-xs font-semibold text-red-600">{e}</p>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-wider text-ink-soft uppercase">Time</label>
          <input name="time" type="time" required className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
          {state?.errors?.time?.map((e) => (
            <p key={e} className="mt-1 text-xs font-semibold text-red-600">{e}</p>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-ink-soft uppercase">Notes (optional)</label>
        <textarea name="notes" rows={2} className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-br from-gold-light to-gold-deep px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(138,97,31,0.55)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Booking…" : "Confirm booking"}
      </button>

      {state?.message && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          <p className="font-semibold">{state.message} Staff will confirm the exact price and slot shortly — we&apos;ll notify you here.</p>
          {state.whatsappUrl && (
            <a href={state.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold text-emerald-900 underline">
              Also notify the salon on WhatsApp &rarr;
            </a>
          )}
        </div>
      )}
    </form>
  );
}
