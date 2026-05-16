import {
  Filter,
  Lock,
  FileDown,
  LayoutList,
  PieChart,
  Moon,
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: <Filter size={18} />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    title: "Advanced filtering",
    description:
      "Filter by status, source, and name simultaneously with debounced search.",
  },
  {
    icon: <Lock size={18} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    title: "Role-based access",
    description:
      "Admin and sales roles with JWT auth and bcrypt password hashing.",
  },
  {
    icon: <FileDown size={18} />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    title: "CSV export",
    description:
      "Export any filtered view to CSV instantly for reporting and analysis.",
  },
  {
    icon: <LayoutList size={18} />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    title: "Pagination",
    description:
      "Backend pagination with 10 records per page and full metadata.",
  },
  {
    icon: <PieChart size={18} />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-700",
    title: "Lead analytics",
    description: "Visual breakdown of leads by source and status at a glance.",
  },
  {
    icon: <Moon size={18} />,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    title: "Dark mode",
    description:
      "Full dark mode support with a single toggle. Easy on the eyes.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="mb-10">
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest text-center mb-6">
        Everything you need
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-9 h-9 rounded-lg ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-3`}
            >
              {f.icon}
            </div>
            <h3 className="text-sm font-medium text-zinc-900 mb-1">
              {f.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
