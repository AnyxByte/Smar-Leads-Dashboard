import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface DashboardSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  widthClass?: string;
  icon?: React.ReactNode;
}

export function DashboardSelect({
  value,
  onValueChange,
  options,
  placeholder,
  widthClass = "w-[180px]",
  icon,
}: DashboardSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-9 ${widthClass} text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer`}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <div className="text-zinc-400 dark:text-zinc-500 shrink-0">{icon}</div>}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>

      <SelectContent
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-950/50 p-1 min-w-[var(--radix-select-trigger-width)] z-50 animate-in fade-in-50 slide-in-from-top-1 duration-100`}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="text-xs text-zinc-800 dark:text-zinc-200 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:bg-zinc-50 dark:focus:bg-zinc-800 py-2 px-3 cursor-pointer outline-none transition-colors data-[disabled]:opacity-50"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}