import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DashboardSelect } from "./DashboardSelect";
import axios from "axios";
import toast from 'react-hot-toast';

const leadFormValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
  source: z.enum(["Website", "Instagram", "Referral"], {
    message: "Source is required",
  }),
});

type LeadFormData = z.infer<typeof leadFormValidationSchema>;

interface Lead {
  id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  createdAt: Date;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
  initial?: Lead | null;
}

export default function LeadModal({
  open,
  onClose,
  onSaveSuccess,
  initial,
}: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

  const {
    register,
    handleSubmit,
    control, 
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "New",
      source: "Website",
    },
  });

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
      reset({
        name: initial?.name ?? "",
        email: initial?.email ?? "",
        status: initial?.status ?? "New",
        source: initial?.source ?? "Website",
      });
      setIsSubmitting(false);
    }
  }, [open, initial, reset]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      const endpoint = initial
        ? `${API_BASE_URL}/leads/${initial.id}`
        : `${API_BASE_URL}/leads`;

      const method = initial ? "put" : "post";

      const response = await axios({
        method,
        url: endpoint,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          initial
            ? "Lead optimized successfully!"
            : "Lead registered into pipeline!",
        );
        
        onSaveSuccess(); 
        onClose();
      }
    } catch (err: any) {
      const serverError =
        err.response?.data?.message ||
        "Error";
      toast.error(serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) =>
        e.target === e.currentTarget && !isSubmitting && onClose()
      }
    >
      {/* 🏆 CHASSIS: Added dark:bg-zinc-900 and dark:border-zinc-800 card parameters */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-150 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            {/* 🏆 HEADING & SUBTITLE: Configured dark text tokens */}
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {initial ? "Edit lead" : "Create new lead"}
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              {initial
                ? "Update the lead details below."
                : "Fill in the details to add a lead."}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Full name
              </label>
              {/* 🏆 INPUT COMPONENT: Injected dark placeholder, text, and field background variables */}
              <Input
                disabled={isSubmitting}
                placeholder="e.g. Rahul Kumar"
                {...register("name")}
                className={`rounded-xl border-zinc-200 dark:border-zinc-800 h-10 text-zinc-900 dark:text-white bg-white dark:bg-zinc-950 placeholder-zinc-400 dark:placeholder-zinc-500 ${
                  errors.name
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "focus-visible:ring-violet-500"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email address
              </label>
              {/* 🏆 INPUT COMPONENT: Fixed text color matching to prevent dark mode typing vanishing */}
              <Input
                type="email"
                disabled={isSubmitting}
                placeholder="e.g. rahul@example.com"
                {...register("email")}
                className={`rounded-xl border-zinc-200 dark:border-zinc-800 h-10 text-zinc-900 dark:text-white bg-white dark:bg-zinc-950 placeholder-zinc-400 dark:placeholder-zinc-500 ${
                  errors.email
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "focus-visible:ring-violet-500"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Dropdown Select Matrix Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Status Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <DashboardSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      options={statusOptions}
                      widthClass="w-full"
                      placeholder="Select status"
                    />
                  )}
                />
              </div>

              {/* Source Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Source
                </label>
                <Controller
                  name="source"
                  control={control}
                  render={({ field }) => (
                    <DashboardSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      options={sourceOptions}
                      widthClass="w-full"
                      placeholder="Select source"
                    />
                  )}
                />
                {errors.source && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.source.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 transition-colors">
            <Button
              variant="outline"
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-4 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 font-medium shadow-sm min-w-[100px] border-0 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing</span>
                </div>
              ) : initial ? (
                "Save changes"
              ) : (
                "Create lead"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}