import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  ArrowRight,
  Filter,
  Lock,
  FileDown,
  LayoutList,
  PieChart,
  Moon,
  LayoutDashboard,
  Users,
  BarChart2,
  Download,
  Settings,
  Search,
  ChevronRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  value: string;
  label: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

interface LeadRow {
  initials: string;
  name: string;
  email: string;
  status: "New" | "Qualified" | "Contacted" | "Lost";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatCard[] = [
  { value: "10k+", label: "Leads tracked" },
  { value: "98%", label: "Uptime SLA" },
  { value: "3x", label: "Faster conversions" },
];

const FEATURES: FeatureCard[] = [
  {
    icon: <Filter size={18} />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    title: "Advanced filtering",
    description:
      "Filter by status, source, and name simultaneously with debounced search.",
  },
  {
    icon: <Lock size={18} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    title: "Role-based access",
    description:
      "Admin and sales roles with JWT auth and bcrypt password hashing.",
  },
  {
    icon: <FileDown size={18} />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    title: "CSV export",
    description:
      "Export any filtered view to CSV instantly for reporting and analysis.",
  },
  {
    icon: <LayoutList size={18} />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    title: "Pagination",
    description:
      "Backend pagination with 10 records per page and full metadata.",
  },
  {
    icon: <PieChart size={18} />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-700",
    title: "Lead analytics",
    description:
      "Visual breakdown of leads by source and status at a glance.",
  },
  {
    icon: <Moon size={18} />,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    title: "Dark mode",
    description:
      "Full dark mode support with a single toggle. Easy on the eyes.",
  },
];

const LEADS: LeadRow[] = [
  { initials: "RK", name: "Rahul Kumar", email: "rahul@example.com", status: "Qualified" },
  { initials: "PS", name: "Priya Sharma", email: "priya@domain.in", status: "New" },
  { initials: "AM", name: "Arjun Mehta", email: "arjun@corp.io", status: "Contacted" },
  { initials: "SV", name: "Sneha Verma", email: "sneha@mail.com", status: "Lost" },
];

const STATUS_STYLES: Record<LeadRow["status"], string> = {
  New: "bg-blue-100 text-blue-800",
  Qualified: "bg-green-100 text-green-800",
  Contacted: "bg-amber-100 text-amber-800",
  Lost: "bg-red-100 text-red-800",
};

const NAV_LINKS = ["Features", "Pricing", "Docs"];

const SIDEBAR_ITEMS = [
  { icon: <LayoutDashboard size={15} />, label: "Dashboard", active: true },
  { icon: <Users size={15} />, label: "Leads", active: false },
  { icon: <BarChart2 size={15} />, label: "Analytics", active: false },
  { icon: <Download size={15} />, label: "Export", active: false },
  { icon: <Settings size={15} />, label: "Settings", active: false },
];

const STATUS_FILTERS = ["All", "New", "Qualified", "Contacted", "Lost"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  return (
    /* Removed width constraints here so it frames nicely inside the main global wrapper */
    <nav className="flex items-center justify-between py-4 border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-medium text-zinc-900">LeadFlow</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Log in
        </Button>
        <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
          Get started
        </Button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center pt-16 pb-12 max-w-2xl mx-auto">
      <Badge
        variant="secondary"
        className="mb-5 bg-violet-100 text-violet-700 border-0 px-3 py-1 text-xs font-medium rounded-full"
      >
        ✦ Smart Lead Management
      </Badge>

      <h1 className="text-[2.5rem] font-medium leading-tight text-zinc-900 mb-4">
        Manage your leads
        <br />
        with <span className="text-violet-600">precision</span>
      </h1>

      <p className="text-base text-zinc-500 leading-relaxed mb-8 max-w-lg">
        Track, filter, and convert leads effortlessly. Built for modern sales
        teams with role-based access, advanced search, and real-time insights.
      </p>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
        >
          <ArrowRight size={16} />
          Start for free
        </Button>
        <Button variant="outline" size="lg">
          View demo
        </Button>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto w-full">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="bg-zinc-50 rounded-lg p-4 text-center border border-zinc-100"
        >
          <div className="text-2xl font-medium text-violet-600">{s.value}</div>
          <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  const [activeFilter, useStateActiveFilter] = useState("All");

  const filteredLeads =
    activeFilter === "All"
      ? LEADS
      : LEADS.filter((l) => l.status === activeFilter);

  return (
    <div className="mb-10 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 shadow-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-zinc-200">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-xs text-zinc-400 ml-2">LeadFlow — Dashboard</span>
      </div>

      <div className="flex" style={{ minHeight: 220 }}>
        {/* Sidebar */}
        <aside className="w-40 bg-white border-r border-zinc-200 py-3 shrink-0">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer ${
                item.active
                  ? "bg-violet-50 text-violet-700 font-medium border-r-2 border-violet-600 mr-2 rounded-r-lg"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-white">
          {/* Filter pills */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                // onClick={() => useStateActiveFilter(f)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-colors ${
                  activeFilter === f
                    ? "bg-violet-100 text-violet-700 border-violet-300"
                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {f}
              </button>
            ))}
            <button className="ml-auto flex items-center gap-1 text-[11px] px-3 py-1 rounded-full border border-zinc-200 text-zinc-500 bg-white hover:border-zinc-300">
              <Search size={10} /> Search
            </button>
          </div>

          {/* Lead rows */}
          <div className="space-y-2">
            {filteredLeads.map((lead) => (
              <div
                key={lead.email}
                className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-zinc-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-[10px] font-medium text-violet-700">
                    {lead.initials}
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-zinc-800">
                      {lead.name}
                    </div>
                    <div className="text-[11px] text-zinc-400">{lead.email}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-medium ${STATUS_STYLES[lead.status]}`}
                >
                  {lead.status}
                </span>
              </div>
            ))}
            {filteredLeads.length === 0 && (
              <p className="text-xs text-zinc-400 text-center py-6">
                No leads found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  return (
    <section className="mb-10">
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest text-center mb-6">
        Everything you need
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-9 h-9 rounded-lg ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-3`}
            >
              {f.icon}
            </div>
            <h3 className="text-sm font-medium text-zinc-900 mb-1">{f.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTAStrip() {
  return (
    <div className="mb-10 bg-violet-50 border border-violet-200 rounded-xl p-8 text-center">
      <h2 className="text-xl font-medium text-violet-900 mb-2">
        Ready to close more deals?
      </h2>
      <p className="text-sm text-violet-600 mb-5">
        Join sales teams already using LeadFlow to manage their pipeline.
      </p>
      <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2 mx-auto">
        Get started free <ChevronRight size={15} />
      </Button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 border-t border-zinc-200">
      <span className="text-xs text-zinc-400">
        © 2026 LeadFlow. Built with MERN + TypeScript.
      </span>
      <div className="flex gap-4">
        {["GitHub", "Docs", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans max-w-6xl mx-auto px-6 antialiased">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <DashboardPreview />
      <FeaturesGrid />
      <CTAStrip />
      <Footer />
    </div>
  );
}