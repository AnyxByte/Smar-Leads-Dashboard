interface StatCard {
  value: string;
  label: string;
}

const STATS: StatCard[] = [
  { value: "10k+", label: "Leads tracked" },
  { value: "98%", label: "Uptime SLA" },
  { value: "3x", label: "Faster conversions" },
];

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto w-full">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="bg-zinc-50 rounded-lg p-4 text-center border border-zinc-100"
        >
          <div className="text-2xl font-medium text-violet-600">{s.value}</div>
          <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
