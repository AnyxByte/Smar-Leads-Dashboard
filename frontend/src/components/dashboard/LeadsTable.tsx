import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
type LeadSource = "Website" | "Instagram" | "Referral";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
}

interface LeadsTableProps {
  paginatedLeads: Lead[];
  safePage: number;
  totalPages: number;
  filteredCount: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (lead: Lead) => void;
  onDeleteTarget: (lead: Lead) => void;
}

const STATUS_STYLES: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400",
  Contacted: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
  Qualified: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400",
  Lost: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400",
};

const SOURCE_STYLES: Record<LeadSource, string> = {
  Website: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  Instagram: "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400",
  Referral: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
};

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function LeadsTable({
  paginatedLeads, safePage, totalPages, filteredCount, setPage, onEdit, onDeleteTarget
}: LeadsTableProps) {
  return (
    <div className="transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 transition-colors">
              <th className="text-left text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Email</th>
              <th className="text-left text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Source</th>
              <th className="text-left text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Created</th>
              <th className="text-right text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {paginatedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-400 shrink-0 select-none">
                      {initials(lead.name)}
                    </div>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200 text-sm whitespace-nowrap">{lead.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">{lead.email}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Badge className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border-0 shadow-none ${STATUS_STYLES[lead.status]}`}>{lead.status}</Badge>
                </td>
                <td className="px-4 py-3.5 hidden sm:table-cell">
                  <Badge className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border-0 shadow-none ${SOURCE_STYLES[lead.source]}`}>{lead.source}</Badge>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs">{fmtDate(lead.createdAt)}</span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(lead)} 
                      className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors cursor-pointer" 
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button 
                      onClick={() => onDeleteTarget(lead)} 
                      className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer" 
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Users size={18} className="text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No leads found</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 transition-colors">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Page <span className="font-medium text-zinc-700 dark:text-zinc-300">{safePage}</span> of <span className="font-medium text-zinc-700 dark:text-zinc-300">{totalPages}</span> · {filteredCount} lead{filteredCount !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer" 
            disabled={safePage <= 1} 
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={14} />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
            .reduce<(number | "…")[]>((acc, p, i, arr) => {
              if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="text-xs text-zinc-400 dark:text-zinc-500 px-1 select-none">…</span>
              ) : (
                <Button 
                  key={p} 
                  variant={p === safePage ? "default" : "outline"} 
                  size="sm"
                  className={`h-8 w-8 p-0 text-xs cursor-pointer ${
                    p === safePage 
                      ? "bg-violet-600 hover:bg-violet-700 text-white border-0" 
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setPage(p as number)}
                >
                  {p}
                </Button>
              )
            )}

          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer" 
            disabled={safePage >= totalPages} 
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}