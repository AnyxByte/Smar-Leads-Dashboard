import { Zap, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useTheme } from "@/context/ThemeContext"; 

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-50 transition-colors duration-200">
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-medium text-zinc-900 dark:text-zinc-50">LeadFlow</span>
      </div>

      <div className="flex items-center gap-3">
        
        <button
          type="button"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
        >
          <Moon 
            size={16} 
            className={`transition-all duration-300 ${
              isDarkMode 
                ? "text-violet-400 fill-violet-400 rotate-[-15deg] filter drop-shadow-[0_0_6px_rgba(167,139,250,0.5)]" 
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          />
        </button>

        <Link to="/auth">
          <Button variant="outline" size="sm" className="dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
            Log in
          </Button>
        </Link>
        <Link to="/auth">
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-0">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
}