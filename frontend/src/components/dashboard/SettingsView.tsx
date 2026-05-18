import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Shield, User, Mail, KeyRound, Save } from "lucide-react";
import axios from "axios";

export default function SettingsView() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Sales User",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Load user details dynamically from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setProfile({
        name: parsed.name || "User Name",
        email: parsed.email || "user@leadflow.io",
        role: parsed.role || "Sales User",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

      // 🏆 HIT THE LIVE ENDPOINT
      const response = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        {
          name: profile.name,
          email: profile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));

        toast.success("Profile records synchronized successfully!");
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err: any) {
      const serverMsg =
        err.response?.data?.message || "Failed to sync profile changes.";
      toast.error(serverMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const isAdmin = profile.role.toLowerCase() === "admin";

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-200">
      {/* 1. ROLE PRIVILEGE BANNER */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div
            className={`p-2.5 rounded-lg shrink-0 ${isAdmin ? "bg-violet-50 text-violet-600" : "bg-zinc-100 text-zinc-600"}`}
          >
            <Shield size={20} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900">
                Security Access Tier
              </h3>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  isAdmin
                    ? "bg-violet-50 text-violet-700 border-violet-200/60"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200"
                }`}
              >
                {profile.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
              {isAdmin
                ? "Full administrative system access enabled. Authorized to execute global bulk modifications, pipeline deletions, and complete database reports."
                : "Standard Sales workspace access. Clearance covers creating and reading lead pipelines. Document deletion requires higher administrative privilege."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. PROFILE EDIT FORM PANEL (Now cleanly spans full width) */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
            Account Specifications
          </h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Update account identity details across system logs.
          </p>
        </div>

        <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600">
              Full Name
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
                className="w-full text-xs bg-white border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="type"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
                className="w-full text-xs bg-white border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-medium text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer select-none"
            >
              {isSaving ? (
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={13} />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
