import { Phone } from "lucide-react";
import { site } from "@/data/site";

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${site.phonePrimaryHref}`}
      aria-label="Call Now"
      className="fixed right-[22px] bottom-[22px] z-[70] grid size-[58px] animate-[jgFloat_3.4s_ease-in-out_infinite] place-items-center rounded-full bg-gold text-ink shadow-[0_10px_30px_rgba(20,17,15,0.32)]"
    >
      <span className="pointer-events-none absolute inset-0 animate-[jgRing_2.4s_ease-out_infinite] rounded-full border border-gold" />
      <Phone size={24} fill="currentColor" strokeWidth={0} />
    </a>
  );
}
