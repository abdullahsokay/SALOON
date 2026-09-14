import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

const features = [
  "Trial makeup sessions",
  "Hairstyling & draping",
  "Outstation services across Pakistan",
  "Dedicated bridal suite",
];

export default function Bridal() {
  return (
    <section id="bridal" className="relative overflow-hidden bg-[#1c1815] text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-20 md:py-32">
        <RevealOnScroll direction="left" className="min-w-0">
          <p className="mb-4 text-xs font-bold tracking-[0.28em] text-gold uppercase">Bridal Bookings Open</p>
          <h2 className="font-serif text-[clamp(34px,4.6vw,62px)] leading-[1.06] font-semibold tracking-tight">
            Your Dream Bridal
            <br />
            Look Starts Here
          </h2>
          <p className="mt-6 max-w-[56ch] text-[16.5px] leading-relaxed text-[#ddd2c4]">
            From Mehndi to Baraat to Walima, our expert bridal team crafts a look that&apos;s uniquely yours.
            Booking for September, October &amp; November weddings is now open — reserve early and enjoy
            exclusive advance-booking rates.
          </p>
          <div className="mt-8 mb-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-[15px] font-semibold text-cream">
                <span className="grid size-[22px] shrink-0 place-items-center border border-gold text-[11px] text-gold">
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>
          <Button href="/book" variant="gold" size="lg">
            Reserve Your Date
          </Button>
        </RevealOnScroll>

        <RevealOnScroll direction="right" className="flex min-w-0 justify-center">
          <div className="w-full max-w-[400px] border border-gold/45 bg-gold/[0.06] p-9 text-center md:p-14">
            <span className="inline-block bg-gold px-3.5 py-1.5 text-[11px] font-bold tracking-[0.22em] text-ink uppercase">
              Advance Booking
            </span>
            <h3 className="mt-6 font-serif text-[clamp(54px,7vw,86px)] leading-[0.95] font-semibold tracking-tight text-gold">
              20% Off
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#ddd2c4]">on bridal packages booked in advance</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
