import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import About from "@/components/home/About";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import ServicesGrid from "@/components/home/ServicesGrid";
import Bridal from "@/components/home/Bridal";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import Testimonials from "@/components/home/Testimonials";
import BookingSection from "@/components/home/BookingSection";
import LocationsHours from "@/components/home/LocationsHours";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <MarqueeBanner />
      <ServicesGrid />
      <Bridal />
      <GalleryTeaser />
      <Testimonials />
      <BookingSection />
      <LocationsHours />
      <Newsletter />
    </>
  );
}
