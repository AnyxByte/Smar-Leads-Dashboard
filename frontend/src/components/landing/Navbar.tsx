import { Zap } from "lucide-react";
import { Button } from "../ui/button";

const NAV_LINKS = ["Features", "Pricing", "Docs"];

export default function Navbar() {
  return (
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