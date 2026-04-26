import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut, Search, Phone, Mail, User, Calendar,
  Truck, Filter, RefreshCw, BarChart3, Clock,
  CheckCircle2, AlertCircle, ArrowRight, Loader2, X
} from "lucide-react";

// ─── Supabase ─────────────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ADMIN_PASSWORD = "ApexAdmin2026!";
const SESSION_KEY = "apex_admin_auth";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["New", "In Progress", "Done"];

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  New:           { bg: "bg-[#ffcc00]/10", text: "text-[#ffcc00]",    dot: "bg-[#ffcc00]" },
  "In Progress": { bg: "bg-blue-500/10",  text: "text-blue-400",      dot: "bg-blue-400" },
  Done:          { bg: "bg-green-500/10", text: "text-green-400",     dot: "bg-green-400" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["New"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status || "New"}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent }: {
  icon: any; label: string; value: number; accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 border flex items-center gap-4 ${
        accent
          ? "bg-[#ffcc00] border-[#ffcc00]"
          : "bg-[#111] border-white/8 hover:border-white/15"
      } transition-colors`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        accent ? "bg-black/15" : "bg-white/5"
      }`}>
        <Icon size={22} className={accent ? "text-black" : "text-[#ffcc00]"} />
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-black/60" : "text-white/40"}`}>
          {label}
        </p>
        <p className={`text-3xl font-bold leading-none mt-1 ${accent ? "text-black" : "text-white"}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500)); // slight delay for feel
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0a0a0a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ffcc00 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: "#ffcc00" }}>
            <Truck size={28} className="text-black" />
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">
            APEX TOWING<span style={{ color: "#ffcc00" }}>.</span>
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium">Admin Dashboard</p>
        </div>

        {/* Card */}
        <motion.form
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 border border-white/8"
          style={{ background: "#111" }}
        >
          <label className="block text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            placeholder="Enter your password"
            className="w-full px-5 py-4 rounded-full border text-white text-sm outline-none transition-all placeholder-white/20"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)",
            }}
            onFocus={e => !error && (e.target.style.borderColor = "rgba(255,204,0,0.5)")}
            onBlur={e => !error && (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
          {error && (
            <p className="text-red-400 text-xs mt-3 flex items-center gap-1.5">
              <AlertCircle size={12} /> Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !pw}
            className="mt-6 w-full flex items-center justify-between pl-6 pr-2 py-2 rounded-full font-semibold text-sm transition-all duration-500 disabled:opacity-50"
            style={{ background: "black", color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ffcc00", e.currentTarget.style.color = "black")}
            onMouseLeave={e => (e.currentTarget.style.background = "black", e.currentTarget.style.color = "white")}
          >
            <span>{loading ? "Signing in..." : "Sign in to Dashboard"}</span>
            <div
              className="p-4 rounded-full transition-all duration-500"
              style={{ background: "#ffcc00" }}
            >
              {loading
                ? <Loader2 size={18} className="text-black animate-spin" />
                : <ArrowRight size={18} className="text-black" />
              }
            </div>
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({ lead, onStatusChange, updating }: {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
  updating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl border border-white/8 hover:border-white/15 transition-all overflow-hidden"
      style={{ background: "#111" }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* Avatar + Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(255,204,0,0.12)" }}
            >
              <User size={18} style={{ color: "#ffcc00" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-white font-bold text-sm">{lead.name || "Unknown"}</span>
                <StatusBadge status={lead.status || "New"} />
                {lead.source && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/8 text-white/35 uppercase tracking-wider">
                    {lead.source}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#ffcc00] transition-colors font-medium"
                  >
                    <Phone size={11} /> {lead.phone}
                  </a>
                )}
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#ffcc00] transition-colors font-medium"
                  >
                    <Mail size={11} /> {lead.email}
                  </a>
                )}
                {lead.service_type && (
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <Truck size={11} /> {lead.service_type}
                  </span>
                )}
                {lead.created_at && (
                  <span className="flex items-center gap-1.5 text-xs text-white/25">
                    <Calendar size={11} /> {formatDate(lead.created_at)}
                  </span>
                )}
              </div>
              {lead.message && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  {expanded ? "Hide notes ↑" : "View notes ↓"}
                </button>
              )}
              <AnimatePresence>
                {expanded && lead.message && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-white/35 leading-relaxed border-l-2 border-[#ffcc00]/30 pl-3"
                  >
                    {lead.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Status buttons */}
          <div className="flex sm:flex-col gap-2 shrink-0 pl-0 sm:pl-4">
            {STATUS_OPTIONS.map(s => {
              const isActive = (lead.status || "New") === s;
              return (
                <button
                  key={s}
                  onClick={() => !isActive && onStatusChange(lead.id, s)}
                  disabled={isActive || updating}
                  className="text-[11px] font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300"
                  style={isActive ? {
                    background: "#ffcc00",
                    color: "black",
                    cursor: "default"
                  } : {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                  onMouseEnter={e => !isActive && (
                    (e.currentTarget.style.background = "rgba(255,204,0,0.12)"),
                    (e.currentTarget.style.color = "#ffcc00"),
                    (e.currentTarget.style.borderColor = "rgba(255,204,0,0.3)")
                  )}
                  onMouseLeave={e => !isActive && (
                    (e.currentTarget.style.background = "rgba(255,255,255,0.05)"),
                    (e.currentTarget.style.color = "rgba(255,255,255,0.4)"),
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                  )}
                >
                  {updating && !isActive ? "···" : s}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [updating, setUpdating] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setUpdating(null);
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      l.name?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.service_type?.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || (l.status || "New") === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => !l.status || l.status === "New").length,
    inProgress: leads.filter(l => l.status === "In Progress").length,
    done: leads.filter(l => l.status === "Done").length,
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="fixed top-0 left-0 right-0 h-px" style={{ background: "#ffcc00", opacity: 0.4 }} />

      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b border-white/8"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#ffcc00" }}
            >
              <Truck size={18} className="text-black" />
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">
                APEX TOWING<span style={{ color: "#ffcc00" }}>.</span>
              </span>
              <p className="text-white/35 text-xs mt-0.5">Lead Management</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-white/35 hover:text-white text-xs font-medium transition-colors px-3 py-2 rounded-full border border-white/8 hover:border-white/20"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Heading */}
        <div>
          <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Lead Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1.5 font-medium">
            All inbound requests from the Apex Towing website
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BarChart3}   label="Total Leads"  value={stats.total}      accent />
          <StatCard icon={AlertCircle} label="New"          value={stats.new}         />
          <StatCard icon={Clock}       label="In Progress"  value={stats.inProgress}  />
          <StatCard icon={CheckCircle2}label="Done"         value={stats.done}        />
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, email, or service..."
              className="w-full pl-11 pr-10 py-3.5 rounded-full border border-white/8 text-sm text-white placeholder-white/20 outline-none transition-all font-medium"
              style={{ background: "#111" }}
              onFocus={e => (e.target.style.borderColor = "rgba(255,204,0,0.4)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Status tabs */}
            {["All", ...STATUS_OPTIONS].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="px-4 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300"
                style={filterStatus === s ? {
                  background: "#ffcc00", color: "black"
                } : {
                  background: "#111", color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                {s}
              </button>
            ))}

            <button
              onClick={fetchLeads}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold border border-white/8 text-white/40 hover:text-white hover:border-white/20 transition-all"
              style={{ background: "#111" }}
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Leads count */}
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs font-semibold">
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""} {filterStatus !== "All" ? `· ${filterStatus}` : ""}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(255,204,0,0.2)", borderTopColor: "#ffcc00" }}
            />
            <p className="text-white/30 text-sm font-medium">Loading leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-28 gap-4"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,204,0,0.08)" }}
            >
              <Truck size={28} style={{ color: "#ffcc00", opacity: 0.4 }} />
            </div>
            <p className="text-white/30 text-sm font-medium">
              {search ? "No leads match your search" : "No leads yet — they'll appear here when people book"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatusChange={updateStatus}
                  updating={updating === lead.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Entry ────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return authed
    ? <Dashboard onLogout={handleLogout} />
    : <LoginScreen onLogin={() => setAuthed(true)} />;
}
