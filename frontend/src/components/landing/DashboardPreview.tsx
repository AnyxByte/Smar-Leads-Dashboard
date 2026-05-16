import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  BarChart2,
  Download,
  Settings,
  Search,
} from "lucide-react";

interface LeadRow {
  initials: string;
  name: string;
  email: string;
  status: "New" | "Qualified" | "Contacted" | "Lost";
}

const LEADS: LeadRow[] = [
  {
    initials: "RK",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    status: "Qualified",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    email: "priya@domain.in",
    status: "New",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    email: "arjun@corp.io",
    status: "Contacted",
  },
  {
    initials: "SV",
    name: "Sneha Verma",
    email: "sneha@mail.com",
    status: "Lost",
  },
];

const STATUS_STYLES: Record<LeadRow["status"], string> = {
  New: "bg-blue-100 text-blue-800",
  Qualified: "bg-green-100 text-green-800",
  Contacted: "bg-amber-100 text-amber-800",
  Lost: "bg-red-100 text-red-800",
};

const SIDEBAR_ITEMS = [
  { icon: <LayoutDashboard size={15} />, label: "Dashboard", active: true },
  { icon: <Users size={15} />, label: "Leads", active: false },
  { icon: <BarChart2 size={15} />, label: "Analytics", active: false },
  { icon: <Download size={15} />, label: "Export", active: false },
  { icon: <Settings size={15} />, label: "Settings", active: false },
];

const STATUS_FILTERS = ["All", "New", "Qualified", "Contacted", "Lost"];

export default function DashboardPreview() {
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
                    <div className="text-[11px] text-zinc-400">
                      {lead.email}
                    </div>
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
