import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";
export type SortOrder = "latest" | "oldest";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalLeads: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface FilterParams {
  status: LeadStatus | "";
  source: LeadSource | "";
  search: string;
  sort: SortOrder;
  page: number;
}

interface LeadContextType {
  leads: Lead[];
  pagination: PaginationMeta | null;
  filters: FilterParams;
  isLoading: boolean;
  error: string | null;
  fetchLeads: (updatedFilters?: Partial<FilterParams>) => Promise<void>;
  updateFilter: (key: keyof FilterParams, value: any) => void;
  resetFilters: () => void;
  deleteLead: (id: string) => Promise<boolean>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const [filters, setFilters] = useState<FilterParams>({
    status: "",
    source: "",
    search: "",
    sort: "latest",
    page: 1,
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

  const fetchLeads = useCallback(
    async (updatedFilters?: Partial<FilterParams>) => {
      setIsLoading(true);
      setError(null);

      const activeFilters = { ...filters, ...updatedFilters };

      try {
        const token = localStorage.getItem("token");

        const params: Record<string, any> = {
          page: activeFilters.page,
          sort: activeFilters.sort,
        };

        if (activeFilters.status) params.status = activeFilters.status;
        if (activeFilters.source) params.source = activeFilters.source;
        if (activeFilters.search.trim()) params.search = activeFilters.search;

        const response = await axios.get(`${API_BASE_URL}/leads`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setLeads(response.data.data);
          setPagination(response.data.pagination); // Save backend metadata
        }
      } catch (err: any) {
        const errMsg =
          err.response?.data?.message || "Failed to load lead stream matrices.";
        setError(errMsg);
        toast.error(errMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, API_BASE_URL],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchLeads();
    }
  }, []);

  const updateFilter = useCallback(
    (key: keyof FilterParams, value: any) => {
      setFilters((prev) => {
        const nextFilters = { ...prev, [key]: value };

        if (key !== "page") {
          nextFilters.page = 1;
        }

        fetchLeads(nextFilters);
        return nextFilters;
      });
    },
    [fetchLeads],
  );

  const resetFilters = useCallback(() => {
    const freshFilters: FilterParams = {
      status: "",
      source: "",
      search: "",
      sort: "latest",
      page: 1,
    };
    setFilters(freshFilters);
    fetchLeads(freshFilters);
  }, [fetchLeads]);

  const deleteLead = async (id: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_BASE_URL}/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Deleted");
        fetchLeads();
        return true;
      }
      return false;
    } catch (err: any) {
      const rbacError =
        err.response?.data?.message || "Action unauthorized on this document.";
      toast.error(rbacError);
      return false;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        pagination,
        filters,
        isLoading,
        error,
        fetchLeads,
        updateFilter,
        resetFilters,
        deleteLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error(
      "useLeads must be used within an anchored LeadProvider frame boundary.",
    );
  }
  return context;
};
