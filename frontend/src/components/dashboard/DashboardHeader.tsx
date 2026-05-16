import {
  Menu,
  Bell,
  TrendingUp,
  UserCheck,
  PhoneCall,
  UserX,
} from "lucide-react";
import StatCard from "./StatCard";

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  stats: { total: number; qualified: number; contacted: number; lost: number };
}

export function DashboardHeader({
  setSidebarOpen,
  stats,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 h-16 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-base font-semibold text-zinc-900">Dashboard</h1>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Manage and track your leads
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-600 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700 shrink-0">
            AD
          </div>
        </div>
      </header>

      {/* Grid wrapper for structural metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6">
        <StatCard
          label="Total leads"
          value={stats.total}
          icon={<TrendingUp size={15} />}
          iconBg="bg-violet-100"
          iconColor="text-violet-700"
          delta="+12%"
        />
        <StatCard
          label="Qualified"
          value={stats.qualified}
          icon={<UserCheck size={15} />}
          iconBg="bg-green-100"
          iconColor="text-green-700"
          delta="+5%"
        />
        <StatCard
          label="Contacted"
          value={stats.contacted}
          icon={<PhoneCall size={15} />}
          iconBg="bg-amber-100"
          iconColor="text-amber-700"
        />
        <StatCard
          label="Lost"
          value={stats.lost}
          icon={<UserX size={15} />}
          iconBg="bg-red-100"
          iconColor="text-red-700"
        />
      </div>
    </div>
  );
}
