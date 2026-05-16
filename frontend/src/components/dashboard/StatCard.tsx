interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  delta?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  delta,
}: StatCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        <div
          className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-semibold text-zinc-900">{value}</span>
        {delta && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
