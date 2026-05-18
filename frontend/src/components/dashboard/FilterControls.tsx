import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  FileDown,
  SlidersHorizontal,
  ArrowUpDown,
  X,
} from "lucide-react";
import { DashboardSelect } from "./DashboardSelect";

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
  const statusOptions = [
    { value: "All", label: "All statuses" },
    ...["New", "Contacted", "Qualified", "Lost"].map((s) => ({
      value: s,
      label: s,
    })),
  ];

  const sourceOptions = [
    { value: "All", label: "All sources" },
    ...["Website", "Instagram", "Referral"].map((s) => ({
      value: s,
      label: s,
    })),
  ];

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];

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
        <div className="relative flex-1 min-w-40 max-w-xs">
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

        <DashboardSelect
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={statusOptions}
          placeholder="Status"
          widthClass="w-[180px]"
          icon={<SlidersHorizontal size={13} />}
        />

        <DashboardSelect
          value={sourceFilter}
          onValueChange={setSourceFilter}
          options={sourceOptions}
          placeholder="Source"
          widthClass="w-[180px]"
        />

        <DashboardSelect
          value={sortOrder}
          onValueChange={(v) => setSortOrder(v as SortOrder)}
          options={sortOptions}
          placeholder="Sort by"
          widthClass="w-[130px]"
          icon={<ArrowUpDown size={13} />}
        />
      </div>
    </div>
  );
}
