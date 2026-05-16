import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";


export default function HeroSection() {
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
