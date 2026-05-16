import { useState, useMemo, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import LeadModal from "@/components/dashboard/LeadModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { FilterControls } from "@/components/dashboard/FilterControls";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
type LeadSource = "Website" | "Instagram" | "Referral";
type SortOrder = "latest" | "oldest";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
}
interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

const PAGE_SIZE = 8;

function makeLead(
  id: string,
  name: string,
  email: string,
  status: LeadStatus,
  source: LeadSource,
  daysAgo: number,
): Lead {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { id, name, email, status, source, createdAt: d };
}

const SEED_LEADS: Lead[] = [
  makeLead(
    "1",
    "Rahul Kumar",
    "rahul@example.com",
    "Qualified",
    "Instagram",
    1,
  ),
  makeLead("2", "Priya Sharma", "priya@domain.in", "New", "Website", 2),
  makeLead("3", "Arjun Mehta", "arjun@corp.io", "Contacted", "Referral", 3),
  makeLead("4", "Sneha Verma", "sneha@mail.com", "Lost", "Website", 4),
  makeLead("5", "Vikram Nair", "vikram@firm.co", "Qualified", "Instagram", 5),
  makeLead("6", "Kavya Pillai", "kavya@startup.io", "New", "Referral", 6),
  makeLead(
    "Desai",
    "Rohan Desai",
    "rohan@ventures.in",
    "Contacted",
    "Website",
    7,
  ),
  makeLead("8", "Ananya Singh", "ananya@tech.com", "Qualified", "Instagram", 8),
  makeLead("9", "Ishaan Bose", "ishaan@labs.dev", "New", "Website", 9),
  makeLead("10", "Diya Patel", "diya@growth.co", "Lost", "Referral", 10),
  makeLead(
    "11",
    "Siddharth Rao",
    "sid@cloudfirm.io",
    "Contacted",
    "Instagram",
    11,
  ),
  makeLead(
    "12",
    "Meera Iyer",
    "meera@clarisio.com",
    "Qualified",
    "Referral",
    12,
  ),
  makeLead("13", "Karan Malhotra", "karan@scale.in", "New", "Website", 13),
  makeLead(
    "14",
    "Pooja Agarwal",
    "pooja@nexus.io",
    "Contacted",
    "Instagram",
    14,
  ),
  makeLead("15", "Nikhil Joshi", "nikhil@devco.in", "Lost", "Referral", 15),
  makeLead(
    "16",
    "Tanya Kapoor",
    "tanya@brandwise.co",
    "Qualified",
    "Website",
    16,
  ),
  makeLead("17", "Aditya Sharma", "aditya@folio.dev", "New", "Instagram", 17),
  makeLead(
    "18",
    "Lakshmi Menon",
    "lakshmi@optics.in",
    "Contacted",
    "Referral",
    18,
  ),
];

function useDebounce<T>(value: T, delay = 400): T {
  const [dv, setDv] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDv(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return dv;
}

function exportCSV(leads: Lead[]): void {
  const headers = ["Name", "Email", "Status", "Source", "Created At"];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.status,
    l.source,
    l.createdAt.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // ── Data Computations ──
  const filtered = useMemo(() => {
    let list = [...leads];
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "All")
      list = list.filter((l) => l.status === statusFilter);
    if (sourceFilter !== "All")
      list = list.filter((l) => l.source === sourceFilter);

    list.sort((a, b) =>
      sortOrder === "latest"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );
    return list;
  }, [leads, debouncedSearch, statusFilter, sourceFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, sourceFilter, sortOrder]);

  const handleSave = (data: LeadFormData) => {
    if (editLead) {
      setLeads((prev) =>
        prev.map((l) => (l.id === editLead.id ? { ...l, ...data } : l)),
      );
    } else {
      const newLead: Lead = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setLeads((prev) => [newLead, ...prev]);
    }
    setModalOpen(false);
    setEditLead(null);
  };

  const stats = useMemo(
    () => ({
      total: leads.length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      lost: leads.filter((l) => l.status === "Lost").length,
    }),
    [leads],
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex antialiased">
      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader setSidebarOpen={setSidebarOpen} stats={stats} />

        <main className="flex-1 px-4 sm:px-6 py-6">
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
            <FilterControls
              filteredCount={filtered.length}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sourceFilter={sourceFilter}
              setSourceFilter={setSourceFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onExport={() => exportCSV(filtered)}
              onAddLeadClick={() => {
                setEditLead(null);
                setModalOpen(true);
              }}
              isFiltered={
                statusFilter !== "All" ||
                sourceFilter !== "All" ||
                !!debouncedSearch
              }
            />

            <LeadsTable
              paginatedLeads={paginated}
              safePage={safePage}
              totalPages={totalPages}
              filteredCount={filtered.length}
              setPage={setPage}
              onEdit={(lead) => {
                setEditLead(lead);
                setModalOpen(true);
              }}
              onDeleteTarget={setDeleteTarget}
            />
          </div>
        </main>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditLead(null);
        }}
        onSave={handleSave}
        initial={editLead}
      />
      <DeleteModal
        open={!!deleteTarget}
        leadName={deleteTarget?.name ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget)
            setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
