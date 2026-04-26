import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut, Search, Phone, Mail, User, Calendar,
  Truck, Filter, RefreshCw, TrendingUp, Clock, CheckCircle, AlertCircle
} from "lucide-react";

// ─── Supabase ────────────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Password Gate ────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "ApexAdmin2026!";
const SESSION_KEY = "apex_admin_auth";

interface Lead {
  id: string;
  name: string;
  phone: string;
  service_type: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

// ─── Status badge colours ─────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  New:           "bg-yellow-400/20 text-yellow-600 border border-yellow-400/40",
  "In Progress": "bg-blue-400/20   text-blue-500   border border-blue-400/40",
  Done:          "bg-green-400/20  text-green-500  border border-green-400/40",
};

const STATUS_OPTIONS = ["New", "In Progress", "Done"];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, colour }: { icon: any; label: string; value: number; colour: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colour}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{label}</p>
        <p className="text-white text-2xl font-bold leading-none mt-1">{value}</p>
      </div>
    </motion.div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-5">
            <Truck size={28} className="text-black" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Apex Towing</h1>
          <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
        </div>

        <motion.form
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-[#111] border border-white/8 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="text-white/50 text-xs font-medium uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all
                ${error ? "border-red-500/60 bg-red-500/5" : "border-white/10 focus:border-yellow-400/60"}`}
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Incorrect password
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
          >
            Sign In →
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
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
    const matchSearch =
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.service_type?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "New").length,
    inProgress: leads.filter(l => l.status === "In Progress").length,
    done: leads.filter(l => l.status === "Done").length,
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const extractEmail = (message: string) => {
    const match = message?.match(/Email:\s*([^\s)]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/8 bg-[#0a0a0a] sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
              <Truck size={18} className="text-black" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-none">Apex Towing</h1>
              <p className="text-white/40 text-xs mt-0.5">Lead Management</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={TrendingUp}   label="Total Leads"  value={stats.total}      colour="bg-white/10 text-white" />
          <StatCard icon={AlertCircle}  label="New"          value={stats.new}         colour="bg-yellow-400/20 text-yellow-400" />
          <StatCard icon={Clock}        label="In Progress"  value={stats.inProgress}  colour="bg-blue-400/20 text-blue-400" />
          <StatCard icon={CheckCircle}  label="Done"         value={stats.done}        colour="bg-green-400/20 text-green-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, or service..."
              className="w-full bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-yellow-400/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-white/30 shrink-0" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40 transition-colors cursor-pointer"
            >
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button
            onClick={fetchLeads}
            disabled={refreshing}
            className="flex items-center gap-2 bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white/60 hover:text-white hover:border-yellow-400/40 transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <Truck size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No leads found</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((lead, i) => {
                const email = extractEmail(lead.message || "");
                const cleanMessage = lead.message?.replace(/\s*\(Email:[^)]+\)/, "").trim();
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-[#111] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-yellow-400/15 rounded-xl flex items-center justify-center shrink-0">
                        <User size={18} className="text-yellow-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-white font-semibold text-sm">{lead.name || "Unknown"}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${STATUS_STYLES[lead.status] || STATUS_STYLES["New"]}`}>
                            {lead.status || "New"}
                          </span>
                          {lead.source && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/8 uppercase tracking-wider">
                              {lead.source}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-yellow-400 transition-colors">
                              <Phone size={11} /> {lead.phone}
                            </a>
                          )}
                          {email && (
                            <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-yellow-400 transition-colors">
                              <Mail size={11} /> {email}
                            </a>
                          )}
                          {lead.service_type && (
                            <span className="flex items-center gap-1.5 text-xs text-white/50">
                              <Truck size={11} /> {lead.service_type}
                            </span>
                          )}
                          {lead.created_at && (
                            <span className="flex items-center gap-1.5 text-xs text-white/30">
                              <Calendar size={11} /> {formatDate(lead.created_at)}
                            </span>
                          )}
                        </div>

                        {cleanMessage && (
                          <p className="text-xs text-white/35 leading-relaxed line-clamp-2">{cleanMessage}</p>
                        )}
                      </div>

                      {/* Status updater */}
                      <div className="flex gap-2 flex-wrap sm:flex-col sm:items-end shrink-0">
                        {STATUS_OPTIONS.map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(lead.id, s)}
                            disabled={lead.status === s || updating === lead.id}
                            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap
                              ${lead.status === s
                                ? "bg-yellow-400 text-black cursor-default"
                                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/8"
                              }`}
                          >
                            {updating === lead.id && lead.status !== s ? "..." : s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Page Entry ─────────────────────────────────────────────────────────
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
