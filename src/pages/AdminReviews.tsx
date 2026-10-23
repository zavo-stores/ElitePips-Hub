import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_location: string | null;
  rating: number;
  review_text: string;
  status: string;
  created_at: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update review");
      return;
    }
    toast.success(`Review ${status}!`);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete review");
      return;
    }
    toast.success("Review deleted");
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-8 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold heading-font mb-2">
            Review <span className="gold-text">Management</span>
          </h1>
          <p className="text-muted-foreground text-sm">Approve or reject user reviews</p>
          {pendingCount > 0 && (
            <p className="text-primary text-sm mt-2 font-semibold">{pendingCount} pending review(s)</p>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No {filter} reviews</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="glass-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {r.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{r.reviewer_name}</p>
                        {r.reviewer_location && <p className="text-xs text-muted-foreground">{r.reviewer_location}</p>}
                      </div>
                      <div className="flex gap-0.5 ml-2">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                        ))}
                      </div>
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                        r.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        r.status === "approved" ? "bg-green-500/20 text-green-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic mt-2">"{r.review_text}"</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-muted-foreground/10">
                  {r.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(r.id, "approved")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-medium transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(r.id, "rejected")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-red-400 text-xs font-medium transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
