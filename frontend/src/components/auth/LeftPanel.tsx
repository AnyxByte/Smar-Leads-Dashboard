import { Zap, Check, TrendingUp, Users, ShieldCheck } from "lucide-react";

const FLOATING_STATS = [
  {
    icon: <TrendingUp size={14} />,
    label: "Leads this month",
    value: "2,847",
    delta: "+18%",
    top: "16%",
    left: "6%",
  },
  {
    icon: <Users size={14} />,
    label: "Active sales users",
    value: "142",
    delta: "+6",
    top: "50%",
    left: "58%",
  },
  {
    icon: <ShieldCheck size={14} />,
    label: "Conversion rate",
    value: "34.2%",
    delta: "+2.1%",
    top: "72%",
    left: "8%",
  },
];

const TESTIMONIAL = {
  quote:
    "LeadFlow replaced three tools for us. Our pipeline is finally one place, and the team ramped up in a single afternoon.",
  name: "Aditi Kapoor",
  role: "Head of Sales, TechVista",
  initials: "AK",
};

const FEATURES = [
  "JWT-secured authentication",
  "Role-based access control",
  "Real-time lead filtering",
  "One-click CSV export",
];

export default function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col relative w-[40%] lg:w-[46%] shrink-0 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border-r border-zinc-200 dark:border-zinc-900 transition-colors duration-200">
      
      <div
        className="absolute inset-0 opacity-[0.6] dark:hidden"
        style={{
          backgroundImage: "radial-gradient(circle, #e4e4e7 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] hidden dark:block"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600 rounded-full blur-[100px] opacity-10 dark:opacity-25 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-700 rounded-full blur-[90px] opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10">
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 lg:w-9  rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/20 dark:shadow-violet-900/40">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-900 dark:text-white tracking-tight">
            LeadFlow
          </span>
        </div>

        <div className="mt-10 lg:mt-14 mb-8 lg:mb-10">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-900 dark:text-white leading-[1.2] tracking-tight mb-4">
            Your pipeline,
            <br />
            <span className="text-violet-600 dark:text-violet-400">perfectly managed.</span>
          </h2>
          <p className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
            Track, convert, and export leads — all in one fast, role-aware
            dashboard built for modern sales teams.
          </p>
        </div>

        <ul className="space-y-2.5 mb-8 lg:mb-12">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-violet-50 dark:bg-violet-900/60 border border-violet-100 dark:border-violet-700/50 flex items-center justify-center shrink-0">
                <Check size={11} className="text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-300">{f}</span>
            </li>
          ))}
        </ul>

        <div className="relative flex-1 min-h-40 hidden xl:block">
          {FLOATING_STATS.map((s) => (
            <div
              key={s.label}
              className="absolute bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-md dark:shadow-xl transition-colors duration-200"
              style={{ top: s.top, left: s.left }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-violet-600 dark:text-violet-400">{s.icon}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-base lg:text-lg font-semibold text-zinc-900 dark:text-white">
                  {s.value}
                </span>
                <span className="text-[10px] lg:text-[11px] text-green-600 dark:text-green-400 font-medium pb-0.5">
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6 transition-colors duration-200">
          <p className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed italic mb-4">
            "{TESTIMONIAL.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-violet-900/60 dark:border-violet-800/50 flex items-center justify-center text-xs font-semibold dark:text-violet-300">
              {TESTIMONIAL.initials}
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-800 dark:text-white">
                {TESTIMONIAL.name}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}