import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TESTIMONIALS } from "@/data/constants";
import { Star, Send, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_location: string | null;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function TestimonialsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, reviewer_name, reviewer_location, rating, review_text, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please sign in to leave a review");
    if (!name.trim() || !reviewText.trim()) return toast.error("Please fill in all required fields");

    setSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        reviewer_name: name.trim(),
        reviewer_location: location.trim() || null,
        rating,
        review_text: reviewText.trim(),
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Review submitted! It will appear after admin approval.");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-1 text-2xl text-primary mb-4">
            {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            <span className="text-lg text-foreground ml-2">4.9/5</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Student <span className="gold-text">Reviews</span>
          </h1>
          <p className="text-muted-foreground">Real results from real traders around the world</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static testimonials */}
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/30" loading="lazy" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
            </div>
          ))}

          {/* DB reviews (approved) */}
          {reviews.map((r) => (
            <div key={r.id} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {r.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{r.reviewer_name}</p>
                  {r.reviewer_location && <p className="text-xs text-muted-foreground">{r.reviewer_location}</p>}
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{r.review_text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leave a Review Section */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        {!showForm && !submitted ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="cta-gold px-8 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Leave a Review
            </button>
          </div>
        ) : submitted ? (
          <div className="glass-card p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold heading-font mb-2">Thank You!</h3>
            <p className="text-muted-foreground text-sm">Your review has been submitted and is pending approval. It will appear on the site once approved.</p>
          </div>
        ) : (
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold heading-font mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Location (City, Country)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Nairobi, Kenya"
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${s <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Your Review *</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  rows={4}
                  placeholder="Share your experience with ElitePipsHub..."
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full cta-gold py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Review
              </button>
              <p className="text-xs text-muted-foreground text-center">Your review will be visible after admin approval.</p>
            </form>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
