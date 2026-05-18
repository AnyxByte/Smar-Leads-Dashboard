import {
  Menu,
  TrendingUp,
  UserCheck,
  PhoneCall,
  UserX,
  Moon,
} from "lucide-react";
import StatCard from "./StatCard";
import { useTheme } from "@/context/ThemeContext"; 

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  stats: { total: number; qualified: number; contacted: number; lost: number };
}

export function DashboardHeader({
  setSidebarOpen,
  stats,
}: DashboardHeaderProps) {
  const { isDarkMode, toggleTheme } = useTheme(); 

  return (
    <div className="space-y-6">
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between px-4 sm:px-6 h-16 gap-4 shrink-0 transition-colors duration-200">
        
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Dashboard</h1>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 hidden sm:block mt-0.5">
              Manage and track your leads
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer select-none"
          >
            <Moon 
              size={15} 
              className={`transition-all duration-300 ${
                isDarkMode 
                  ? "text-violet-400 fill-violet-400 rotate-[-15deg] filter drop-shadow-[0_0_6px_rgba(167,139,250,0.5)]" 
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            />
          </button>
        </div>

      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6">
        <StatCard
          label="Total leads"
          value={stats.total}
          icon={<TrendingUp size={15} />}
          iconBg="bg-violet-100 dark:bg-violet-950/50"
          iconColor="text-violet-700 dark:text-violet-400"
        />
        <StatCard
          label="Qualified"
          value={stats.qualified}
          icon={<UserCheck size={15} />}
          iconBg="bg-green-100 dark:bg-green-950/50"
          iconColor="text-green-700 dark:text-green-400"
        />
        <StatCard
          label="Contacted"
          value={stats.contacted}
          icon={<PhoneCall size={15} />}
          iconBg="bg-amber-100 dark:bg-amber-950/50"
          iconColor="text-amber-700 dark:text-amber-400"
        />
        <StatCard
          label="Lost"
          value={stats.lost}
          icon={<UserX size={15} />}
          iconBg="bg-red-100 dark:bg-red-950/50"
          iconColor="text-red-700 dark:text-red-400"
        />
      </div>
    </div>
  );
}