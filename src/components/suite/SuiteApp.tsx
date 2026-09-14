"use client";

import { useMemo, useRef, useState } from "react";
import "@/app/dashboard/suite.css";
import {
  ACCESS_CYCLE, Appointment, Approval, Branch, ClientRecord, DUTY_CYCLE, InventoryItem,
  NEXT_STATUS, SalonSettings, ServiceItem, Stylist, TODAY_LABEL, TeamUser,
  INITIAL_ACTIVITY, INITIAL_APPOINTMENTS, INITIAL_APPROVALS, INITIAL_CLIENTS,
  INITIAL_NOTIFS, INITIAL_SERVICES, INITIAL_SETTINGS,
  accessTone, dutyTone, money, statusTone,
} from "@/lib/suite-data";
import type { SuiteUser } from "./SuiteAuth";
import Overview from "./tabs/Overview";
import Appointments from "./tabs/Appointments";
import OnlineRequests, { OnlineBookingRow } from "./tabs/OnlineRequests";
import Services from "./tabs/Services";
import Staff from "./tabs/Staff";
import Clients from "./tabs/Clients";
import Billing from "./tabs/Billing";
import Inventory from "./tabs/Inventory";
import Website, { WebsiteServiceRow } from "./tabs/Website";
import Settings from "./tabs/Settings";
import ApptModal, { ApptFormState } from "./modals/ApptModal";
import ServiceModal, { ServiceFormState } from "./modals/ServiceModal";
import InvoiceModal from "./modals/InvoiceModal";

export interface DecoratedAppt extends Appointment {
  tone: { bg: string; fg: string; bd: string };
  payTone: { bg: string; fg: string; bd: string };
  nextLabel: string;
  advance: () => void;
  settle: () => void;
  openInvoice: () => void;
}

export interface DecoratedStylist extends Stylist {
  tone: { bg: string; fg: string; bd: string };
  toggle: () => void;
}

export interface DecoratedTeamUser extends TeamUser {
  tone: { bg: string; fg: string; bd: string };
  toggle: () => void;
}

export interface DecoratedInventoryItem extends InventoryItem {
  fg: string;
  fill: string;
  pct: number;
  restock: () => void;
}

type TabId = "overview" | "appointments" | "services" | "staff" | "clients" | "billing" | "inventory" | "website" | "settings";

const TAB_TITLES: Record<TabId, string> = {
  overview: "Operations overview",
  appointments: "Appointments desk",
  services: "Treatment menu",
  staff: "Stylists & team",
  clients: "Client directory",
  billing: "Billing & POS",
  inventory: "Stock & supplies",
  website: "Website control",
  settings: "Salon settings",
};

const HOURS = ["11", "12", "13", "14", "15", "16", "17", "18", "19"];
const HOUR_START = 11;
const HOUR_END = 20;

interface SuiteAppProps {
  user: SuiteUser;
  onSignOut: () => void;
  onlineBookings: OnlineBookingRow[];
  websiteServices: WebsiteServiceRow[];
  acceptOnlineBooking: (formData: FormData) => void;
  declineOnlineBooking: (formData: FormData) => void;
  updateServicePrice: (formData: FormData) => void;
  toggleServiceVisibility: (formData: FormData) => void;
  dbStylists: Stylist[];
  dbInventory: InventoryItem[];
  dbTeam: TeamUser[];
  toggleStylistDutyAction: (id: string) => void;
  restockInventoryAction: (id: string) => void;
  toggleStaffAccessAction: (id: string) => void;
}

export default function SuiteApp({
  user, onSignOut, onlineBookings, websiteServices,
  acceptOnlineBooking, declineOnlineBooking, updateServicePrice, toggleServiceVisibility,
  dbStylists, dbInventory, dbTeam, toggleStylistDutyAction, restockInventoryAction, toggleStaffAccessAction,
}: SuiteAppProps) {
  const [tab, setTab] = useState<TabId>("overview");
  const [branch, setBranch] = useState<Branch>("F-7 Markaz, Islamabad");
  const [q, setQ] = useState("");
  const [toast, setToast] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [online, setOnline] = useState<OnlineBookingRow[]>(onlineBookings);

  const [appts, setAppts] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [stylists, setStylists] = useState<Stylist[]>(dbStylists);
  const [clients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(dbInventory);
  const [team, setTeam] = useState<TeamUser[]>(dbTeam);
  const [approvals, setApprovals] = useState<Approval[]>(INITIAL_APPROVALS);
  const [activity] = useState(INITIAL_ACTIVITY);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [settings, setSettings] = useState<SalonSettings>(INITIAL_SETTINGS);

  const [apptModalOpen, setApptModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  const [apptForm, setApptForm] = useState<ApptFormState>({
    client: "", phone: "", service: services[0].name, stylist: stylists[0].name, time: "03:00 PM",
  });
  const [serviceForm, setServiceForm] = useState<ServiceFormState>({
    name: "", category: "Hair", duration: "60 mins", price: "10000",
  });

  const nextApptSeq = useRef(106);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  function showToast(msg: string) {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function advance(id: string) {
    setAppts((prev) => prev.map((a) => {
      const next = NEXT_STATUS[a.status];
      if (a.id !== id || !next) return a;
      return { ...a, status: next, paymentStatus: next === "Completed" ? "Paid" : a.paymentStatus };
    }));
    showToast(id + " moved on");
  }

  function settle(id: string, price: number) {
    setAppts((prev) => prev.map((a) => (a.id === id ? { ...a, paymentStatus: "Paid" } : a)));
    showToast(money(price) + " collected");
  }

  function toggleStylist(id: string) {
    let updatedName = "";
    setStylists((prev) => prev.map((s) => {
      if (s.id !== id) return s;
      updatedName = s.name;
      const next = DUTY_CYCLE[(DUTY_CYCLE.indexOf(s.status) + 1) % DUTY_CYCLE.length];
      return { ...s, status: next };
    }));
    if (updatedName) showToast(updatedName + " status changed");
    toggleStylistDutyAction(id);
  }

  function toggleAccess(id: string) {
    let updatedName = "";
    setTeam((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      updatedName = u.name;
      const next = ACCESS_CYCLE[(ACCESS_CYCLE.indexOf(u.access) + 1) % ACCESS_CYCLE.length];
      return { ...u, access: next };
    }));
    if (updatedName) showToast(updatedName + " access updated");
    toggleStaffAccessAction(id);
  }

  function restock(id: string) {
    let unit = "";
    setInventory((prev) => prev.map((it) => {
      if (it.id !== id) return it;
      unit = it.unit;
      return { ...it, stock: it.stock + 5 };
    }));
    if (unit) showToast("+5 " + unit + " logged");
    restockInventoryAction(id);
  }

  function acceptOnline(req: OnlineBookingRow) {
    const row: Appointment = {
      id: "APT-" + nextApptSeq.current++,
      clientName: req.clientName,
      clientPhone: req.clientPhone || "—",
      serviceName: req.serviceName,
      category: (services.find((s) => s.name === req.serviceName)?.category ?? "Hair") as Appointment["category"],
      stylistName: req.stylistName,
      date: TODAY_LABEL,
      time: req.time,
      startH: 15, endH: 16.5,
      price: req.price,
      status: "Confirmed",
      paymentStatus: req.depositAmount >= req.price ? "Paid" : "Pending",
    };
    setAppts((prev) => [row, ...prev]);
    setOnline((prev) => prev.filter((r) => r.id !== req.id));
    showToast(req.clientName + "'s request added to the desk");
  }

  function declineOnline(req: OnlineBookingRow) {
    setOnline((prev) => prev.filter((r) => r.id !== req.id));
    showToast(req.clientName + "'s request declined — client notified");
  }

  function approve(id: string, title: string) {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    showToast("Approved: " + title);
  }
  function decline(id: string, title: string) {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    showToast("Declined: " + title);
  }

  const today = appts.filter((a) => a.date === TODAY_LABEL);
  const revToday = today.reduce((t, a) => t + a.price, 0);
  const busy = stylists.filter((s) => s.status === "In Appointment").length;
  const onDuty = stylists.filter((s) => s.status !== "Off Duty").length;
  const lowStock = inventory.filter((i) => i.stock <= i.minAlert);
  const activeCount = appts.filter((a) => a.status === "Confirmed" || a.status === "In Progress").length;
  const paidTotal = appts.filter((a) => a.paymentStatus === "Paid").reduce((t, a) => t + a.price, 0);
  const pendingTotal = appts.filter((a) => a.paymentStatus !== "Paid").reduce((t, a) => t + a.price, 0);
  const avgTicket = Math.round(appts.reduce((t, a) => t + a.price, 0) / appts.length);

  const week = [
    { label: "Thu", v: 182 }, { label: "Fri", v: 164 }, { label: "Sat", v: 268 },
    { label: "Sun", v: 241 }, { label: "Mon", v: 138 }, { label: "Tue", v: 196 },
    { label: "Today", v: Math.round(revToday / 1000) },
  ];
  const maxV = Math.max(...week.map((w) => w.v));
  const bars = week.map((w, i) => ({
    label: w.label, value: w.v, pct: Math.round((w.v / maxV) * 100),
    fill: i === week.length - 1 ? "var(--suite-accent)" : "var(--suite-text)",
  }));
  const weekTotal = money(week.reduce((t, w) => t + w.v, 0) * 1000);

  const catTotals: Record<string, number> = {};
  today.forEach((a) => { catTotals[a.category] = (catTotals[a.category] || 0) + a.price; });
  const catMax = Math.max(1, ...Object.values(catTotals));
  const catSplit = Object.keys(catTotals)
    .sort((a, b) => catTotals[b] - catTotals[a])
    .map((k, i) => ({
      label: k, value: money(catTotals[k]), pct: Math.round((catTotals[k] / catMax) * 100),
      fill: i === 0 ? "var(--suite-accent)" : "var(--suite-text)",
    }));

  function decorateAppt(a: Appointment): DecoratedAppt {
    const tone = statusTone(a.status);
    const payTone = a.paymentStatus === "Paid"
      ? { bg: "var(--suite-neutral-200)", fg: "var(--suite-neutral-800)", bd: "var(--suite-neutral-300)" }
      : { bg: "var(--suite-accent-200)", fg: "var(--suite-accent-800)", bd: "var(--suite-accent-300)" };
    const nextLabel = a.status === "Confirmed" ? "Start" : a.status === "In Progress" ? "Complete" : "";
    return {
      ...a, tone, payTone, nextLabel,
      advance: () => advance(a.id),
      settle: () => settle(a.id, a.price),
      openInvoice: () => setInvoiceId(a.id),
    };
  }
  const decoratedAppts = appts.map(decorateAppt);
  const ql = q.trim().toLowerCase();
  const filteredAppts = ql
    ? decoratedAppts.filter((a) => (a.clientName + " " + a.serviceName + " " + a.stylistName + " " + a.id).toLowerCase().includes(ql))
    : decoratedAppts;

  const roster: DecoratedStylist[] = stylists.map((s) => ({
    ...s,
    appointmentsToday: appts.filter((a) => a.stylistName === s.name && a.date === TODAY_LABEL).length,
    tone: dutyTone(s.status),
    toggle: () => toggleStylist(s.id),
  }));

  const chairRows = stylists.map((st) => ({
    name: st.name,
    blocks: appts
      .filter((a) => a.stylistName === st.name && a.date === TODAY_LABEL)
      .map((a) => {
        const tone = statusTone(a.status);
        const span = HOUR_END - HOUR_START;
        return {
          left: Math.max(0, ((a.startH - HOUR_START) / span) * 100),
          width: Math.min(100, ((a.endH - a.startH) / span) * 100),
          fill: tone.bg === "transparent" ? "var(--suite-accent-200)" : tone.bg,
          fg: tone.bg === "transparent" ? "var(--suite-accent-800)" : tone.fg,
          label: a.clientName.split(" ")[0],
          title: a.serviceName + " - " + a.time,
        };
      }),
  }));

  const decoratedInventory: DecoratedInventoryItem[] = inventory.map((it) => ({
    ...it,
    fg: it.stock <= it.minAlert ? "var(--suite-accent-700)" : "var(--suite-text)",
    fill: it.stock <= it.minAlert ? "var(--suite-accent)" : "var(--suite-text)",
    pct: Math.min(100, Math.round((it.stock / Math.max(it.minAlert * 3, 1)) * 100)),
    restock: () => restock(it.id),
  }));

  const decoratedTeam: DecoratedTeamUser[] = team.map((u) => ({
    ...u, tone: accessTone(u.access), toggle: () => toggleAccess(u.id),
  }));

  const kpis = [
    { label: "Revenue today", value: money(revToday), note: "+12% on last Thursday", noteFg: "var(--suite-accent-700)" },
    { label: "Bookings today", value: String(today.length), note: activeCount + " still open", noteFg: "var(--suite-neutral-700)" },
    { label: "Chairs in use", value: busy + "/" + stylists.length, note: onDuty + " stylists on duty", noteFg: "var(--suite-neutral-700)" },
    { label: "Stock alerts", value: String(lowStock.length), note: lowStock.length ? "Reorder before Friday" : "All levels healthy", noteFg: lowStock.length ? "var(--suite-accent-700)" : "var(--suite-neutral-700)" },
  ];

  const navDefs: { id: TabId; label: string; badge: string }[] = [
    { id: "overview", label: "Overview", badge: "" },
    { id: "appointments", label: "Appointments", badge: String(activeCount) },
    { id: "services", label: "Treatments", badge: String(services.length) },
    { id: "staff", label: "Team", badge: String(onDuty) },
    { id: "clients", label: "Clients", badge: String(clients.length) },
    { id: "billing", label: "Billing", badge: "" },
    { id: "inventory", label: "Inventory", badge: lowStock.length ? String(lowStock.length) : "" },
    { id: "website", label: "Website", badge: online.length ? String(online.length) : "" },
    { id: "settings", label: "Settings", badge: "" },
  ];

  function selectTab(id: TabId) {
    setTab(id);
    setNotifOpen(false);
  }

  function addAppt(e: React.FormEvent) {
    e.preventDefault();
    const svc = services.find((s) => s.name === apptForm.service);
    const row: Appointment = {
      id: "APT-" + nextApptSeq.current++,
      clientName: apptForm.client || "Walk-in client",
      clientPhone: apptForm.phone || "-",
      serviceName: apptForm.service,
      category: svc ? svc.category : "Hair",
      stylistName: apptForm.stylist,
      date: TODAY_LABEL,
      time: apptForm.time,
      startH: 15, endH: 16.5,
      price: svc ? svc.price : 10000,
      status: "Confirmed",
      paymentStatus: "Pending",
    };
    setAppts((prev) => [row, ...prev]);
    setApptModalOpen(false);
    setApptForm((f) => ({ ...f, client: "", phone: "" }));
    showToast("Booking " + row.id + " confirmed");
  }

  function addService(e: React.FormEvent) {
    e.preventDefault();
    const row: ServiceItem = {
      id: "SRV-" + String(services.length + 1).padStart(2, "0"),
      name: serviceForm.name || "New treatment",
      category: serviceForm.category,
      duration: serviceForm.duration,
      price: Number(serviceForm.price) || 5000,
      bookings: 0,
    };
    setServices((prev) => [...prev, row]);
    setServiceModalOpen(false);
    setServiceForm((f) => ({ ...f, name: "" }));
    showToast(row.name + " added to menu");
  }

  const invoiceAppt = useMemo(() => appts.find((a) => a.id === invoiceId) || null, [appts, invoiceId]);

  return (
    <div className="suite-root">
      <div className="suite-app">
        <aside className="suite-sidebar">
          <div style={{ padding: 20, borderBottom: "2px solid var(--suite-text)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em" }}>JUGNU&rsquo;S</span>
              <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em", color: "var(--suite-accent)" }}>SUITE</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--suite-neutral-700)" }}>Salon operations</p>
          </div>

          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--suite-neutral-300)", display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--suite-neutral-600)" }}>Branch</p>
            <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--suite-divider)" }}>
              <button
                onClick={() => { setBranch("F-7 Markaz, Islamabad"); showToast("Viewing F-7 Markaz"); }}
                style={{ textAlign: "left", padding: "9px 11px", border: 0, cursor: "pointer", fontSize: 12, fontWeight: 700, background: branch === "F-7 Markaz, Islamabad" ? "var(--suite-text)" : "#fff", color: branch === "F-7 Markaz, Islamabad" ? "#fff" : "var(--suite-neutral-800)" }}
              >
                F-7 Markaz, Islamabad
              </button>
              <button
                onClick={() => { setBranch("Jhelum Branch"); showToast("Viewing Jhelum branch"); }}
                style={{ textAlign: "left", padding: "9px 11px", border: 0, borderTop: "1px solid var(--suite-divider)", cursor: "pointer", fontSize: 12, fontWeight: 700, background: branch === "Jhelum Branch" ? "var(--suite-text)" : "#fff", color: branch === "Jhelum Branch" ? "#fff" : "var(--suite-neutral-800)" }}
              >
                Jhelum Branch
              </button>
            </div>
          </div>

          <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
            {navDefs.map((item) => (
              <button key={item.id} onClick={() => selectTab(item.id)} className={`suite-nav-item${tab === item.id ? " is-active" : ""}`}>
                <span>{item.label}</span>
                {item.badge && <span className="suite-nav-badge">{item.badge}</span>}
              </button>
            ))}
          </nav>

          <div style={{ borderTop: "2px solid var(--suite-text)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 36, height: 36, flex: "none", background: "var(--suite-text)", color: "#fff", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 800 }}>
                {user.name.charAt(0)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</p>
                <p style={{ margin: "1px 0 0", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-accent-700)" }}>{user.role}</p>
              </div>
            </div>
            <button className="suite-btn suite-btn-secondary" style={{ justifyContent: "flex-start", fontSize: 12 }} onClick={onSignOut}>Sign out</button>
          </div>
        </aside>

        <main className="suite-main">
          <header className="suite-header">
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--suite-neutral-600)" }}>{branch}</p>
              <h1 style={{ margin: "1px 0 0", fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em" }}>{TAB_TITLES[tab]}</h1>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setTab("appointments"); }} style={{ flex: "none", width: 240, display: "flex" }}>
              <input className="suite-input" style={{ minHeight: 40, background: "var(--suite-neutral-100)" }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients, services" />
            </form>

            <div style={{ position: "relative", flex: "none" }}>
              <button className="suite-btn suite-btn-secondary suite-btn-icon" style={{ width: 40, height: 40, position: "relative" }} title="Notifications" onClick={() => setNotifOpen((v) => !v)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
                <span style={{ position: "absolute", top: -1, right: -1, minWidth: 16, height: 16, padding: "0 3px", background: "var(--suite-accent)", color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" }}>{notifs.length}</span>
              </button>
              {notifOpen && (
                <div className="suite-notif-panel">
                  <div style={{ padding: "12px 14px", borderBottom: "2px solid var(--suite-text)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>Notifications</span>
                    <button onClick={() => { setNotifs([]); setNotifOpen(false); showToast("Notifications cleared"); }} style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontSize: 11, fontWeight: 700, color: "var(--suite-accent-700)" }}>Mark read</button>
                  </div>
                  {notifs.map((n) => (
                    <div key={n.id} style={{ padding: "12px 14px", borderBottom: "1px solid var(--suite-neutral-300)", display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</span>
                      <span style={{ fontSize: 12, color: "var(--suite-neutral-700)" }}>{n.body}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="suite-btn suite-btn-primary" style={{ flex: "none", minHeight: 40 }} onClick={() => setApptModalOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
              <span>New booking</span>
            </button>
          </header>

          <div className="suite-workspace" style={{ minWidth: 1060 }}>
            {tab === "overview" && (
              <Overview
                kpis={kpis} bars={bars} weekTotal={weekTotal} catSplit={catSplit}
                hours={HOURS} chairRows={chairRows} deskAppts={decoratedAppts.slice(0, 4)}
                apptCount={appts.length} approvals={approvals} onApprove={approve} onDecline={decline}
                roster={roster} activity={activity}
                goAppointments={() => selectTab("appointments")}
                goBilling={() => selectTab("billing")}
                goInventory={() => selectTab("inventory")}
                goStaff={() => selectTab("staff")}
                openApptModal={() => setApptModalOpen(true)}
              />
            )}
            {tab === "appointments" && (
              <>
                <OnlineRequests
                  requests={online}
                  onAccept={acceptOnline}
                  onDecline={declineOnline}
                  acceptAction={acceptOnlineBooking}
                  declineAction={declineOnlineBooking}
                />
                <Appointments branch={branch} filteredAppts={filteredAppts} openApptModal={() => setApptModalOpen(true)} />
              </>
            )}
            {tab === "services" && (
              <Services services={services} openServiceModal={() => setServiceModalOpen(true)} />
            )}
            {tab === "staff" && (
              <Staff roster={roster} teamUsers={decoratedTeam} />
            )}
            {tab === "clients" && (
              <Clients clients={clients} />
            )}
            {tab === "billing" && (
              <Billing paidTotal={paidTotal} pendingTotal={pendingTotal} avgTicket={avgTicket} appts={decoratedAppts} />
            )}
            {tab === "inventory" && (
              <Inventory inventory={decoratedInventory} lowStockCount={lowStock.length} />
            )}
            {tab === "website" && (
              <Website services={websiteServices} updatePrice={updateServicePrice} toggleVisibility={toggleServiceVisibility} />
            )}
            {tab === "settings" && (
              <Settings
                settings={settings}
                onChange={(patch) => setSettings((s) => ({ ...s, ...patch }))}
                branch={branch}
                onSave={() => showToast("Salon record saved")}
                onSignOut={onSignOut}
              />
            )}
          </div>
        </main>
      </div>

      {toast && <div className="suite-toast">{toast}</div>}

      {apptModalOpen && (
        <ApptModal
          branch={branch}
          form={apptForm}
          onChange={(patch) => setApptForm((f) => ({ ...f, ...patch }))}
          services={services}
          stylists={stylists}
          onClose={() => setApptModalOpen(false)}
          onSubmit={addAppt}
        />
      )}

      {serviceModalOpen && (
        <ServiceModal
          form={serviceForm}
          onChange={(patch) => setServiceForm((f) => ({ ...f, ...patch }))}
          onClose={() => setServiceModalOpen(false)}
          onSubmit={addService}
        />
      )}

      {invoiceAppt && (
        <InvoiceModal
          appt={invoiceAppt}
          settings={settings}
          onClose={() => setInvoiceId(null)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
}
