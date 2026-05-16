import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  FileDown,
  SlidersHorizontal,
  ArrowUpDown,
  X,
} from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
type LeadSource = "Website" | "Instagram" | "Referral";
type SortOrder = "latest" | "oldest";

interface FilterControlsProps {
  filteredCount: number;
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sourceFilter: string;
  setSourceFilter: (val: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (val: SortOrder) => void;
  onExport: () => void;
  onAddLeadClick: () => void;
  isFiltered: boolean;
}

export function FilterControls({
  filteredCount,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  sortOrder,
  setSortOrder,
  onExport,
  onAddLeadClick,
  isFiltered,
}: FilterControlsProps) {
  return (
    <div className="px-4 sm:px-6 py-4 border-b border-zinc-100 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">All Leads</h2>
          <p className="text-xs text-zinc-400">
            {filteredCount} result{filteredCount !== 1 ? "s" : ""}
            {isFiltered && " (filtered)"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-zinc-600"
            onClick={onExport}
          >
            <FileDown size={14} /> Export CSV
          </Button>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5"
            onClick={onAddLeadClick}
          >
            <Plus size={14} /> Add lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              onClick={() => setSearch("")}
            >
              <X size={13} />
            </button>
          )}
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[130px] text-sm">
            <SlidersHorizontal
              size={13}
              className="mr-1 text-zinc-400 shrink-0"
            />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            {["New", "Contacted", "Qualified", "Lost"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="h-9 w-[130px] text-sm">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All sources</SelectItem>
            {["Website", "Instagram", "Referral"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(v) => setSortOrder(v as SortOrder)}
        >
          <SelectTrigger className="h-9 w-[120px] text-sm">
            <ArrowUpDown size={13} className="mr-1 text-zinc-400 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
