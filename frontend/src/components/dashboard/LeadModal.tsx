import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

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

const SOURCES: LeadSource[] = ["Website", "Instagram", "Referral"];
const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Lost"];

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
              {initial
                ? "Update the lead details below."
                : "Fill in the details to add a lead."}
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
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">
              Full name
            </label>
            <Input
              ref={nameRef}
              placeholder="e.g. Rahul Kumar"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={
                errors.name ? "border-red-400 focus-visible:ring-red-400" : ""
              }
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">
              Email address
            </label>
            <Input
              type="email"
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className={
                errors.email ? "border-red-400 focus-visible:ring-red-400" : ""
              }
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Status + Source */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Status
              </label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as LeadStatus }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Source
              </label>
              <Select
                value={form.source}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, source: v as LeadSource }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-100">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white"
            onClick={handleSubmit}
          >
            {initial ? "Save changes" : "Create lead"}
          </Button>
        </div>
      </div>
    </div>
  );
}
