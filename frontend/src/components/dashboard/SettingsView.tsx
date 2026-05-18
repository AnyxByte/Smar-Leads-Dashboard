import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Shield, User, Mail, Save } from "lucide-react";
import axios from "axios";

export default function SettingsView() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Sales User",
  });

  const [isSaving, setIsSaving] = useState(false);

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
        toast.success("Profile updated!");
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err: any) {
      const serverMsg =
        err.response?.data?.message || "Failed to update.";
      toast.error(serverMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const isAdmin = profile.role.toLowerCase() === "admin";

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-200">
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-colors duration-200">
        <div className="flex items-start gap-4">

          <div
            className={`p-2.5 rounded-lg shrink-0 transition-colors ${
              isAdmin 
                ? "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" 
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            <Shield size={20} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Security Access Tier
              </h3>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                  isAdmin
                    ? "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                }`}
              >
                {profile.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {isAdmin
                ? "Full administrative system access enabled. Authorized to execute global bulk modifications, pipeline deletions, and complete database reports."
                : "Standard Sales workspace access. Clearance covers creating and reading lead pipelines. Document deletion requires higher administrative privilege."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-200">

        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 transition-colors">
          <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
            Account Specifications
          </h3>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
            Update account identity details across system logs.
          </p>
        </div>

        <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
         
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Full Name
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
                className="w-full text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-zinc-800 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
                className="w-full text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-zinc-800 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
       
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer select-none"
            >
              {isSaving ? (
                <span className="w-3 h-3 border-2 border-white/30 dark:border-zinc-950/30 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" />
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