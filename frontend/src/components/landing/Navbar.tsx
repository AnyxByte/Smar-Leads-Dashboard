import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-medium text-zinc-900">LeadFlow</span>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/auth">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
        <Link
          to="/auth"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
