import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DashboardSelect } from "./DashboardSelect"; // Import your reusable dropdown module

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

interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: LeadFormData) => void;
  initial?: Lead | null;
}

export default function LeadModal({
  open,
  onClose,
  onSave,
  initial,
}: ModalProps) {
  const [form, setForm] = useState<LeadFormData>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    status: initial?.status ?? "New",
    source: initial?.source ?? "Website",
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  // Map option data arrays neatly for your reusable component structure
  const statusOptions = ["New", "Contacted", "Qualified", "Lost"].map((s) => ({
    value: s,
    label: s,
  }));

  const sourceOptions = ["Website", "Instagram", "Referral"].map((s) => ({
    value: s,
    label: s,
  }));

  useEffect(() => {
    if (open) {
      setForm({
        name: initial?.name ?? "",
        email: initial?.email ?? "",
        status: initial?.status ?? "New",
        source: initial?.source ?? "Website",
      });
      setErrors({});
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open, initial]);

  const validate = (): boolean => {
    const e: Partial<LeadFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              {initial ? "Edit lead" : "Create new lead"}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {initial ? "Update the lead details below." : "Fill in the details to add a lead."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Full name
            </label>
            <Input
              ref={nameRef}
              placeholder="e.g. Rahul Kumar"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`rounded-xl border-zinc-200 h-10 ${
                errors.name ? "border-red-400 focus-visible:ring-red-400" : "focus-visible:ring-violet-500"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Email address
            </label>
            <Input
              type="email"
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`rounded-xl border-zinc-200 h-10 ${
                errors.email ? "border-red-400 focus-visible:ring-red-400" : "focus-visible:ring-violet-500"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Reusable Select Matrix Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700">
                Status
              </label>
              <DashboardSelect
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as LeadStatus }))}
                options={statusOptions}
                widthClass="w-full" // Instruct component to expand fully to match grid columns
                placeholder="Select status"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700">
                Source
              </label>
              <DashboardSelect
                value={form.source}
                onValueChange={(v) => setForm((f) => ({ ...f, source: v as LeadSource }))}
                options={sourceOptions}
                widthClass="w-full" // Instruct component to expand fully to match grid columns
                placeholder="Select source"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-100">
          <Button variant="outline" onClick={onClose} size="sm" className="rounded-xl px-4 text-zinc-600">
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 font-medium shadow-sm"
            onClick={handleSubmit}
          >
            {initial ? "Save changes" : "Create lead"}
          </Button>
        </div>
      </div>
    </div>
  );
}