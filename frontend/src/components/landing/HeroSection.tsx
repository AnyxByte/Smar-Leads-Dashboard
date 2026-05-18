import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center pt-16 pb-12 max-w-2xl mx-auto">
      
      {/* 🏆 BADGE: Subdued violet tint background on dark canvas */}
      <Badge
        variant="secondary"
        className="mb-5 bg-violet-100 text-violet-700 border-0 px-3 py-1 text-xs font-medium rounded-full dark:bg-violet-950/40 dark:text-violet-400 transition-colors"
      >
        ✦ Smart Lead Management
      </Badge>

      {/* 🏆 HEADING: Inverts text to sharp white and softens primary violet tag */}
      <h1 className="text-[2.5rem] font-medium leading-tight text-zinc-900 dark:text-white mb-4">
        Manage your leads
        <br />
        with <span className="text-violet-600 dark:text-violet-400">precision</span>
      </h1>

      {/* 🏆 SUBTITLE: Changes text depth to balanced gray text layer */}
      <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-lg">
        Track, filter, and convert leads effortlessly. Built for modern sales
        teams with role-based access, advanced search, and real-time insights.
      </p>

      {/* 🏆 BUTTON CONTAINER: Outline button adjusts border/hover shades natively */}
      <div className="flex items-center gap-3">
        <Button
          size="lg"
          className="bg-violet-600 hover:bg-violet-700 text-white gap-2 cursor-pointer border-0"
        >
          <ArrowRight size={16} />
          Start for free
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer"
        >
          View demo
        </Button>
      </div>

    </section>
  );
}