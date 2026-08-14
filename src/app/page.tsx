import Hero from "@/components/home/Hero";
import ParallaxShowcase from "@/components/home/ParallaxShowcase";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import Leadership from "@/components/home/Leadership";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import Testimonials from "@/components/home/Testimonials";
import LocationsHours from "@/components/home/LocationsHours";
import MarqueeBanner from "@/components/home/MarqueeBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ParallaxShowcase />
      <TrustBar />
      <ServicesGrid />
      <MarqueeBanner />
      <Leadership />
      <WhyChooseUs />
      <GalleryTeaser />
      <Testimonials />
      <LocationsHours />
    </>
  );
}
