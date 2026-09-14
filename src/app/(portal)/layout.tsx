import "./portal.css";
import PortalNav from "@/components/portal/PortalNav";
import PortalFooter from "@/components/portal/PortalFooter";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-root">
      <PortalNav />
      <main>{children}</main>
      <PortalFooter />
    </div>
  );
}
