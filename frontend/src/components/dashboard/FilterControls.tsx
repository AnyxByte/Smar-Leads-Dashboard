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
    /* 🏆 CONTAINER: Injected dark:border-zinc-800 to clean up the divider line */
    <div className="px-4 sm:px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 space-y-3 transition-colors duration-200">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          {/* 🏆 HEADINGS: Swapped default text for dark adaptive text tokens */}
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">All Leads</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            {filteredCount} result{filteredCount !== 1 ? "s" : ""}
            {isFiltered && " (filtered)"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* 🏆 EXPORT BUTTON: Styled borders and hover transitions for dark viewports */}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
            onClick={onExport}
          >
            <FileDown size={14} /> Export CSV
          </Button>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white gap-1.5 border-0 cursor-pointer"
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
          />
          {/* 🏆 INPUT COMPONENT: Forced high contrast text, background depth layers, and matching borders */}
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm text-zinc-900 dark:text-zinc-50 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-xl focus-visible:ring-violet-500"
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              onClick={() => setSearch("")}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Dropdown controls handle custom widths cleanly inside local arrays */}
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