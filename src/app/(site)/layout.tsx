import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCallButton from "@/components/layout/FloatingCallButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCallButton />
    </SmoothScrollProvider>
  );
}
