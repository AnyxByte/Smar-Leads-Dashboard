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
    /* 🏆 CARD CONTAINER: Flips from flat white to deep zinc, adjusting hover shadows cleanly */
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm dark:hover:shadow-zinc-950/20 transition-all duration-200">
      <div className="flex items-center justify-between">
        {/* 🏆 CARD LABEL: Attunes secondary typography depth for optimal contrast */}
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
        
        {/* Dynamic theme utility strings cascade through here flawlessly from your header script */}
        <div
          className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center transition-colors`}
        >
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        {/* 🏆 MAIN DIGIT VALUE: Inverts primary metric registers into sharp white highlights */}
        <span className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
          {value}
        </span>
        
        {delta && (
          /* 🏆 PERFORMANCE RADIAL PILL: Mutes positive indicators down into a dark moss-green layout hue */
          <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full font-medium transition-colors">
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}