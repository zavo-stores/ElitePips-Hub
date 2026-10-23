import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Users, Calendar, Mail, Globe, Monitor, Clock, BarChart3 } from "lucide-react";

interface VisitorLog {
  id: string;
  email: string | null;
  full_name: string | null;
  sign_in_method: string | null;
  user_agent: string | null;
  created_at: string;
  session_end: string | null;
  duration_seconds: number | null;
}

interface AggregatedVisitor {
  email: string;
  full_name: string;
  visitCount: number;
  totalDuration: number;
  lastVisit: string;
  lastMethod: string;
  lastDevice: string;
}

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "Active / N/A";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data } = await supabase
        .from("visitor_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (data) setVisitors(data as VisitorLog[]);
      setLoading(false);
    };
    fetchVisitors();
  }, []);

  // Aggregate visitors by email
  const aggregated = useMemo<AggregatedVisitor[]>(() => {
    const map = new Map<string, AggregatedVisitor>();
    for (const v of visitors) {
      const key = v.email || v.id;
      const existing = map.get(key);
      if (existing) {
        existing.visitCount += 1;
        existing.totalDuration += v.duration_seconds || 0;
        if (v.created_at > existing.lastVisit) {
          existing.lastVisit = v.created_at;
          existing.lastMethod = v.sign_in_method || "email";
          existing.lastDevice = v.user_agent?.includes("Mobile") ? "📱 Mobile" : "💻 Desktop";
          if (v.full_name) existing.full_name = v.full_name;
        }
      } else {
        map.set(key, {
          email: v.email || "—",
          full_name: v.full_name || "—",
          visitCount: 1,
          totalDuration: v.duration_seconds || 0,
          lastVisit: v.created_at,
          lastMethod: v.sign_in_method || "email",
          lastDevice: v.user_agent?.includes("Mobile") ? "📱 Mobile" : "💻 Desktop",
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.lastVisit.localeCompare(a.lastVisit));
  }, [visitors]);

  const uniqueEmails = aggregated.length;
  const todayVisits = visitors.filter((v) => {
    const today = new Date().toDateString();
    return new Date(v.created_at).toDateString() === today;
  }).length;
  const frequentVisitors = aggregated.filter(a => a.visitCount >= 5).length;

  const getFrequencyBadge = (count: number) => {
    if (count >= 10) return { label: `🔥 ${count} visits`, cls: "bg-red-500/10 text-red-400" };
    if (count >= 5) return { label: `⭐ ${count} visits`, cls: "bg-primary/10 text-primary" };
    if (count >= 2) return { label: `👋 ${count} visits`, cls: "bg-blue-500/10 text-blue-400" };
    return { label: "🆕 1st visit", cls: "bg-secondary text-muted-foreground" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Site <span className="gold-text">Visitors</span>
          </h1>
          <p className="text-muted-foreground">Admin dashboard — Track who's visiting ElitePipsHub</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold heading-font gold-text">{visitors.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Sign-ins</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold heading-font gold-text">{uniqueEmails}</p>
            <p className="text-xs text-muted-foreground mt-1">Unique Visitors</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold heading-font gold-text">{todayVisits}</p>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold heading-font gold-text">{frequentVisitors}</p>
            <p className="text-xs text-muted-foreground mt-1">Frequent Visitors</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="glass-card overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading visitors...</div>
          ) : aggregated.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No visitors yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b gold-border text-muted-foreground text-xs">
                    <th className="text-left p-4"><Mail className="w-3 h-3 inline mr-1" />Email</th>
                    <th className="text-left p-4"><Users className="w-3 h-3 inline mr-1" />Name</th>
                    <th className="text-left p-4"><BarChart3 className="w-3 h-3 inline mr-1" />Visits</th>
                    <th className="text-left p-4"><Clock className="w-3 h-3 inline mr-1" />Total Duration</th>
                    <th className="text-left p-4"><Calendar className="w-3 h-3 inline mr-1" />Last Visit</th>
                    <th className="text-left p-4"><Globe className="w-3 h-3 inline mr-1" />Method</th>
                    <th className="text-left p-4"><Monitor className="w-3 h-3 inline mr-1" />Device</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregated.map((v) => {
                    const badge = getFrequencyBadge(v.visitCount);
                    return (
                      <tr key={v.email} className="border-b border-secondary/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 text-primary">{v.email}</td>
                        <td className="p-4">{v.full_name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{formatDuration(v.totalDuration)}</td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(v.lastVisit).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                            {v.lastMethod}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-xs">{v.lastDevice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
