"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/gsap";
import { serviceImage } from "@/data/images";

// The one Three.js surface in the app, per plan — a WebGL card stack
// replacing the mockup's CSS transform-style:preserve-3d hero. Everything
// else on the portal (and the whole rest of the site) stays GSAP/CSS.
const PortalHero3D = dynamic(() => import("./PortalHero3D"), { ssr: false, loading: () => null });

function subscribe() {
  return () => {};
}
// Nothing external to resolve to true either way, this stays static.
function getSnapshot() {
  return !prefersReducedMotion();
}
// Matches the server: no window, so no point rendering the WebGL canvas —
// useSyncExternalStore re-renders with the real client value right after
// hydration, avoiding a mismatch.
function getServerSnapshot() {
  return false;
}

export default function PortalHero({ nextFreeLabel }: { nextFreeLabel: string }) {
  const canRender3D = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const photoUrl = serviceImage("bridal", 0, 900);

  return (
    <div className="portal-rise" style={{ position: "relative", width: "min(420px, 90vw)", height: "min(500px, 70vw)", margin: "0 auto" }}>
      {canRender3D ? (
        <PortalHero3D photoUrl={photoUrl} />
      ) : (
        <div className="portal-rise" style={{ position: "absolute", inset: 0, overflow: "hidden", border: "2px solid var(--portal-ink)" }}>
          <Image src={photoUrl} alt="Jugnu's Salon & Studio" fill className="object-cover" sizes="420px" />
        </div>
      )}

      <div style={{ animation: "portalRise 0.6s cubic-bezier(.16,1,.3,1) 0.15s backwards, portalFloat 4.5s ease-in-out 0.75s infinite", position: "absolute", left: -22, bottom: 56, background: "var(--portal-paper)", border: "2px solid var(--portal-ink)", padding: "14px 18px", pointerEvents: "none" }}>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--portal-mute)" }}>Next free slot</p>
        <p style={{ margin: "5px 0 0", fontSize: 22, fontWeight: 900, letterSpacing: "-.03em" }}>{nextFreeLabel}</p>
      </div>
      <div style={{ animation: "portalRise 0.6s cubic-bezier(.16,1,.3,1) 0.3s backwards, portalFloat 5.5s ease-in-out 0.9s infinite", position: "absolute", right: -18, top: 38, background: "var(--portal-accent)", color: "var(--portal-paper)", padding: "12px 16px", pointerEvents: "none" }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "-.01em" }}>3 chairs open now</p>
      </div>
    </div>
  );
}
