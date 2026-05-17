import { useState } from "react";
import { useForm } from "react-hook-form"; // ─── IMPORT HOOK
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  TrendingUp,
  Users,
  ShieldCheck,
  Mail,
  Lock,
  User,
  ChevronRight,
} from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirm?: string;
}

const FLOATING_STATS = [
  {
    icon: <TrendingUp size={14} />,
    label: "Leads this month",
    value: "2,847",
    delta: "+18%",
    top: "18%",
    left: "6%",
  },
  {
    icon: <Users size={14} />,
    label: "Active sales users",
    value: "142",
    delta: "+6",
    top: "52%",
    left: "62%",
  },
  {
    icon: <ShieldCheck size={14} />,
    label: "Conversion rate",
    value: "34.2%",
    delta: "+2.1%",
    top: "74%",
    left: "8%",
  },
];

const TESTIMONIAL = {
  quote:
    "LeadFlow replaced three tools for us. Our pipeline is finally one place, and the team ramped up in a single afternoon.",
  name: "Aditi Kapoor",
  role: "Head of Sales, TechVista",
  initials: "AK",
};

const FEATURES = [
  "JWT-secured authentication",
  "Role-based access control",
  "Real-time lead filtering",
  "One-click CSV export",
];

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function SocialAuthGroup({ labelAction }: { labelAction: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
          {labelAction}
        </span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          className="h-10 text-xs font-semibold gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl transition-all shadow-sm"
        >
          <GoogleIcon /> Google
        </Button>
        <Button
          variant="outline"
          type="button"
          className="h-10 text-xs font-semibold gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl transition-all shadow-sm"
        >
          <GitHubIcon /> GitHub
        </Button>
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col relative w-[46%] shrink-0 bg-zinc-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600 rounded-full blur-[100px] opacity-25 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-700 rounded-full blur-[90px] opacity-20 pointer-events-none" />

      <div className="relative flex flex-col h-full px-10 py-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <Zap size={17} className="text-white" />
          </div>
          <span className="text-[18px] font-semibold text-white tracking-tight">
            LeadFlow
          </span>
        </div>

        <div className="mt-14 mb-10">
          <h2 className="text-3xl xl:text-4xl font-semibold text-white leading-[1.2] tracking-tight mb-4">
            Your pipeline,
            <br />
            <span className="text-violet-400">perfectly managed.</span>
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            Track, convert, and export leads — all in one fast, role-aware
            dashboard built for modern sales teams.
          </p>
        </div>

        <ul className="space-y-2.5 mb-12">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-violet-900/60 border border-violet-700/50 flex items-center justify-center shrink-0">
                <Check size={11} className="text-violet-400" />
              </div>
              <span className="text-sm text-zinc-300">{f}</span>
            </li>
          ))}
        </ul>

        <div className="relative flex-1 min-h-40">
          {FLOATING_STATS.map((s) => (
            <div
              key={s.label}
              className="absolute bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl px-4 py-3 shadow-xl"
              style={{ top: s.top, left: s.left }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-violet-400">{s.icon}</span>
                <span className="text-[10px] text-zinc-500 font-medium">
                  {s.label}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-lg font-semibold text-white">
                  {s.value}
                </span>
                <span className="text-[11px] text-green-400 font-medium pb-0.5">
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-400 leading-relaxed italic mb-4">
            "{TESTIMONIAL.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-900/60 border border-violet-800/50 flex items-center justify-center text-xs font-semibold text-violet-300">
              {TESTIMONIAL.initials}
            </div>
            <div>
              <p className="text-xs font-medium text-white">
                {TESTIMONIAL.name}
              </p>
              <p className="text-[10px] text-zinc-500">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormPanelProps {
  mode: AuthMode;
  onSwitch: () => void;
}

function AuthFormPanel({ mode, onSwitch }: FormPanelProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormData>();

  const passwordValue = watch("password", "");

  const getStrength = (pw: string) => {
    let score = 0;
    if (pw?.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const map = [
      { label: "", color: "bg-zinc-200" },
      { label: "Weak", color: "bg-red-500", text: "text-red-500" },
      { label: "Fair", color: "bg-amber-500", text: "text-amber-500" },
      { label: "Good", color: "bg-blue-500", text: "text-blue-500" },
      { label: "Strong", color: "bg-green-500", text: "text-green-600" },
    ];
    return { score, ...map[score] };
  };

  const strength = getStrength(passwordValue);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    console.log("Form Action Submitted Successfully:", data);
    // Real API fetch/axios operations plug into this pipeline target later
    await new Promise((r) => setTimeout(r, 1300));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <Check size={26} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900">
          {mode === "login" ? "Welcome back!" : "Account created!"}
        </h2>
        <p className="text-sm text-zinc-500 max-w-xs">
          {mode === "login"
            ? "Redirecting you to the dashboard…"
            : "Taking you straight to your pipeline engine workspace…"}
        </p>
        <div className="w-32 h-1 bg-zinc-100 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-violet-600 rounded-full animate-[grow_1.5s_ease-in-out_forwards]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-sm">
      {/* Header Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-1.5 tracking-tight">
          {mode === "login" ? "Sign in to LeadFlow" : "Create your account"}
        </h1>
        <p className="text-sm text-zinc-500">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
          >
            {mode === "login" ? "Create one free" : "Sign in"}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Conditional Field: Name (Only on Signup) */}
        {mode === "signup" && (
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Full name
            </label>
            <div className="relative">
              <User
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <Input
                placeholder="Rahul Kumar"
                {...register("name", { required: "Full name is required" })}
                className={`pl-9 h-10 rounded-xl border-zinc-200 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : "focus-visible:ring-violet-500"}`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              type="email"
              placeholder="you@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Enter a valid email address",
                },
              })}
              className={`pl-9 h-10 rounded-xl border-zinc-200 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : "focus-visible:ring-violet-500"}`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-zinc-700">
              Password
            </label>
            {mode === "login" && (
              <button
                type="button"
                className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength:
                  mode === "signup"
                    ? { value: 8, message: "At least 8 characters required" }
                    : undefined,
              })}
              className={`pl-9 pr-10 h-10 rounded-xl border-zinc-200 ${errors.password ? "border-red-400 focus-visible:ring-red-300" : "focus-visible:ring-violet-500"}`}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Realtime Password Strength Layout Indicators (Only on Signup) */}
          {mode === "signup" && passwordValue && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength.score ? strength.color : "bg-zinc-200"}`}
                  />
                ))}
              </div>
              {strength.label && (
                <p className={`text-[11px] font-semibold ${strength.text}`}>
                  {strength.label} password
                </p>
              )}
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {mode === "signup" && (
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <Input
                type={showConf ? "text" : "password"}
                placeholder="Re-enter password"
                {...register("confirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className={`pl-9 pr-10 h-10 rounded-xl border-zinc-200 ${errors.confirm ? "border-red-400 focus-visible:ring-red-300" : "focus-visible:ring-violet-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowConf((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              {passwordValue && watch("confirm") === passwordValue && (
                <div className="absolute right-9 top-1/2 -translate-y-1/2">
                  <Check size={14} className="text-green-500" />
                </div>
              )}
            </div>
            {errors.confirm && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errors.confirm.message}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-5! h-10 bg-violet-600 hover:bg-violet-700 text-white gap-2 shadow-sm rounded-xl font-medium"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {mode === "login" ? "Signing in…" : "Creating account…"}
            </>
          ) : (
            <>
              {mode === "login" ? "Sign in" : "Create account"}
              {mode === "login" ? (
                <ArrowRight size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </>
          )}
        </Button>
      </form>

      <SocialAuthGroup
        labelAction={mode === "login" ? "or sign in with" : "or sign up with"}
      />
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <>
      <style>{`@keyframes grow { from { width: 0%; } to { width: 100%; } }`}</style>

      <div className="min-h-screen flex bg-white antialiased">
        <LeftPanel />

        <div className="flex-1 flex flex-col">
          {/* Mobile adaptive layout top banner */}
          <div className="lg:hidden flex items-center gap-2.5 px-6 py-5 border-b border-zinc-100">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <span className="text-[16px] font-semibold text-zinc-900 tracking-tight">
              LeadFlow
            </span>
          </div>

          <div className="flex justify-end px-6 pt-5 pb-2">
            <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
              {(["login", "signup"] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    mode === m
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  {m === "login" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 py-4">
            <AuthFormPanel
              key={mode}
              mode={mode}
              onSwitch={() => setMode(mode === "login" ? "signup" : "login")}
            />
          </div>

          <div className="px-6 pb-4 text-center">
            <p className="text-xs text-zinc-400 font-medium">
              © 2026 LeadFlow · Built with MERN + TypeScript
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
