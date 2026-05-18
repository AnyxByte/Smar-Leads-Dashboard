import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Zap, LayoutDashboard, Settings, LogOut } from "lucide-react";

// 🏆 1. UPDATE THE PROPS INTERFACE TO EXPECT VIEW STATES FROM DASHBOARD
interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  currentView: "Dashboard" | "Settings"; // Track active selection
  setView: (view: "Dashboard" | "Settings") => void; // Trigger view flip
}

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  { icon: <Settings size={16} />, label: "Settings" },
];

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  currentView,
  setView,
}: SidebarProps) {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    name: "User",
    email: "user@leadflow.io",
    role: "Sales User",
  });

  // Dynamic local storage listener keeps profile data perfectly in sync
  useEffect(() => {
    const loadUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserProfile({
          name: parsedUser.name || "User Name",
          email: parsedUser.email || "user@leadflow.io",
          role: parsedUser.role || "Sales User",
        });
      }
    };

    loadUserData();
    window.addEventListener("storage", loadUserData);
    return () => window.removeEventListener("storage", loadUserData);
  }, []);

  const handleLogOutAction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

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

      {/* Nav Link Stack */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-3 pb-2 pt-1">
          Main
        </p>
        {NAV_ITEMS.map((item) => {
          // 🏆 2. DYNAMICALLY CHECK IF THE LINK IS ACTIVE BASED ON GLOBAL STATE
          const isItemActive = currentView === item.label;

          return (
            <button
              key={item.label}
              type="button"
              // 🏆 3. TRIGGER VIEW CHANGE + CLOSE MOBILE WRAPPER ON CLICK
              onClick={() => {
                setView(item.label as "Dashboard" | "Settings");
                onMobileClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                isItemActive
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-zinc-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-700 shrink-0 select-none">
            {getInitials(userProfile.name)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-800 truncate">
              {userProfile.name}
            </p>
            <p className="text-[10px] text-zinc-400 truncate">
              {userProfile.email}
            </p>
          </div>

          <button
            onClick={handleLogOutAction}
            title="Log out of system session"
            className="text-zinc-400 hover:text-red-500 hover:bg-red-50/50 p-1.5 rounded-lg transition-all cursor-pointer"
          >
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
