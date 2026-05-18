import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import LeadModal from "@/components/dashboard/LeadModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { useLeads, SortOrder } from "@/context/LeadContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import SettingsView from "@/components/dashboard/SettingsView";

type ViewMode = "Dashboard" | "Settings";

export default function Dashboard() {
  const {
    leads,
    pagination,
    filters,
    isLoading,
    updateFilter,
    deleteLead,
    fetchLeads
  } = useLeads();

  const [currentView, setCurrentView] = useState<ViewMode>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState(filters.search);
  const [lastDispatchedSearch, setLastDispatchedSearch] = useState(
    filters.search,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

  useEffect(() => {
    if (filters.search === "") {
      setSearch("");
      setLastDispatchedSearch("");
    }
  }, [filters.search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (search !== lastDispatchedSearch) {
        setLastDispatchedSearch(search);
        updateFilter("search", search);
      }
    }, 400);

    return () => clearTimeout(delayTimer);
  }, [search, lastDispatchedSearch, updateFilter]);

  const stats = useMemo(() => {
    return {
      total: pagination?.totalLeads ?? leads.length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      lost: leads.filter((l) => l.status === "Lost").length,
    };
  }, [leads, pagination]);

  const handleExportCSV = async () => {
    try {
      toast.loading("Compiling pipeline export matrices...");
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/leads`, {
        params: {
          status: filters.status,
          source: filters.source,
          search: filters.search,
          sort: filters.sort,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      const allLeads = response.data.data;

      const headers = ["Name", "Email", "Status", "Source", "Created At"];
      const rows = allLeads.map((l: any) => [
        `"${l.name}"`,
        `"${l.email}"`,
        `"${l.status}"`,
        `"${l.source}"`,
        new Date(l.createdAt).toLocaleDateString("en-IN"),
      ]);

      const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = url;
      downloadAnchor.download = `leadflow_export_${new Date().toISOString().split("T")[0]}.csv`;

      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success("CSV Document exported successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Export process terminated due to a network error.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const success = await deleteLead(deleteTarget._id);
    if (success) {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex antialiased transition-colors duration-200">
      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
        currentView={currentView}
        setView={(v: ViewMode) => setCurrentView(v)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setSidebarOpen={setSidebarOpen} stats={stats} />

        <main className="flex-1 px-4 sm:px-6 py-6">
          {currentView === "Dashboard" ? (
         
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-150">
              <FilterControls
                filteredCount={pagination?.totalLeads ?? leads.length}
                search={search}
                setSearch={setSearch}
                statusFilter={filters.status || "All"}
                setStatusFilter={(val) =>
                  updateFilter("status", val === "All" ? "" : val)
                }
                sourceFilter={filters.source || "All"}
                setSourceFilter={(val) =>
                  updateFilter("source", val === "All" ? "" : val)
                }
                sortOrder={filters.sort}
                setSortOrder={(val) => updateFilter("sort", val as SortOrder)}
                onExport={handleExportCSV}
                onAddLeadClick={() => {
                  setEditLead(null);
                  setModalOpen(true);
                }}
                isFiltered={
                  filters.status !== "" ||
                  filters.source !== "" ||
                  filters.search !== ""
                }
              />

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <span className="w-8 h-8 border-3 border-zinc-200 border-t-violet-600 rounded-full animate-spin" />
                  <p className="text-xs font-medium text-zinc-400 tracking-tight">
                    Syncing active platform records...
                  </p>
                </div>
              ) : (
                <LeadsTable
                  paginatedLeads={leads.map((lead) => ({
                    id: lead._id,
                    name: lead.name,
                    email: lead.email,
                    status: lead.status,
                    source: lead.source,
                    createdAt: new Date(lead.createdAt),
                  }))}
                  safePage={pagination?.page ?? 1}
                  totalPages={pagination?.totalPages ?? 1}
                  filteredCount={pagination?.totalLeads ?? leads.length}
                  setPage={(newPage) => updateFilter("page", newPage)}
                  onEdit={(mappedLead) => {
                    setEditLead(mappedLead);
                    setModalOpen(true);
                  }}
                  onDeleteTarget={(mappedLead) => {
                    const originalLead = leads.find(
                      (l) => l._id === mappedLead.id,
                    );
                    if (originalLead) {
                      setDeleteTarget(originalLead);
                    }
                  }}
                />
              )}
            </div>
          ) : (
            <SettingsView />
          )}
        </main>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditLead(null);
        }}
        onSaveSuccess={() => updateFilter("page", pagination?.page || 1)}
        initial={editLead}
      />

      <DeleteModal
        open={!!deleteTarget}
        leadName={deleteTarget?.name ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}