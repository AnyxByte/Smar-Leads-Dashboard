import {
  Zap,
  LayoutDashboard,
  Users,
  BarChart2,
  Download,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: "Dashboard", active: true },
  { icon: <Users size={16} />, label: "Leads", active: false },
  { icon: <BarChart2 size={16} />, label: "Analytics", active: false },
  { icon: <Download size={16} />, label: "Export", active: false },
  { icon: <Settings size={16} />, label: "Settings", active: false },
];

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const inner = (
    <div className="flex flex-col h-full bg-white border-r border-zinc-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-100">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
          <Zap size={15} className="text-white" />
        </div>
        <span className="text-[16px] font-semibold text-zinc-900 tracking-tight">
          LeadFlow
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-3 pb-2 pt-1">
          Main
        </p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={onMobileClose}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              item.active
                ? "bg-violet-50 text-violet-700 font-medium"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-zinc-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700 shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-800 truncate">
              Admin User
            </p>
            <p className="text-[10px] text-zinc-400 truncate">
              admin@leadflow.io
            </p>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0">
        {inner}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={onMobileClose} />
          <aside className="relative flex flex-col w-64 h-full z-50">
            {inner}
          </aside>
        </div>
      )}
    </>
  );
}
