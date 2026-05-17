import { Zap, Check, TrendingUp, Users, ShieldCheck } from "lucide-react";

const FLOATING_STATS = [
  {
    icon: <TrendingUp size={14} />,
    label: "Leads this month",
    value: "2,847",
    delta: "+18%",
    top: "18%",
    left: "6%",
  },
  {
    icon: <Users size={14} />,
    label: "Active sales users",
    value: "142",
    delta: "+6",
    top: "52%",
    left: "62%",
  },
  {
    icon: <ShieldCheck size={14} />,
    label: "Conversion rate",
    value: "34.2%",
    delta: "+2.1%",
    top: "74%",
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
    <div className="hidden lg:flex flex-col relative w-[46%] shrink-0 bg-zinc-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600 rounded-full blur-[100px] opacity-25 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-700 rounded-full blur-[90px] opacity-20 pointer-events-none" />

      <div className="relative flex flex-col h-full px-10 py-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <Zap size={17} className="text-white" />
          </div>
          <span className="text-[18px] font-semibold text-white tracking-tight">
            LeadFlow
          </span>
        </div>

        <div className="mt-14 mb-10">
          <h2 className="text-3xl xl:text-4xl font-semibold text-white leading-[1.2] tracking-tight mb-4">
            Your pipeline,
            <br />
            <span className="text-violet-400">perfectly managed.</span>
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            Track, convert, and export leads — all in one fast, role-aware
            dashboard built for modern sales teams.
          </p>
        </div>

        <ul className="space-y-2.5 mb-12">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-violet-900/60 border border-violet-700/50 flex items-center justify-center shrink-0">
                <Check size={11} className="text-violet-400" />
              </div>
              <span className="text-sm text-zinc-300">{f}</span>
            </li>
          ))}
        </ul>

        <div className="relative flex-1 min-h-40">
          {FLOATING_STATS.map((s) => (
            <div
              key={s.label}
              className="absolute bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl px-4 py-3 shadow-xl"
              style={{ top: s.top, left: s.left }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-violet-400">{s.icon}</span>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {s.label}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-lg font-semibold text-white">
                  {s.value}
                </span>
                <span className="text-[11px] text-green-400 font-medium pb-0.5">
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-400 leading-relaxed italic mb-4">
            "{TESTIMONIAL.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-900/60 border border-violet-800/50 flex items-center justify-center text-xs font-semibold text-violet-300">
              {TESTIMONIAL.initials}
            </div>
            <div>
              <p className="text-xs font-medium text-white">
                {TESTIMONIAL.name}
              </p>
              <p className="text-[10px] text-zinc-500">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
