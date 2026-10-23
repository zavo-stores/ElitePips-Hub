import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BROKERS, WHOP_COURSES, AFFILIATE_LINKS } from "@/data/constants";
import { ExternalLink, Star, BookOpen } from "lucide-react";

export default function StartTrading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Start Your <span className="gold-text">Trading Journey</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create your trading account with our trusted partners. Low spreads, fast execution, and M-Pesa support.
          </p>
        </div>
      </section>

      {/* Brokers */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold heading-font mb-6">Recommended Brokers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BROKERS.map((b) => (
            <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="glass-card p-6 group cursor-pointer block">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{b.name}</h3>
                {b.recommended && (
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> RECOMMENDED
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{b.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {b.features.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{f}</span>
                ))}
              </div>
              <span className="cta-gold px-4 py-2 text-sm flex items-center justify-center gap-2 w-full">
                Create Account <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Affiliate Courses */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold heading-font">Premium Courses</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHOP_COURSES.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="glass-card p-5 group">
              <h3 className="font-semibold text-sm mb-2">{c.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{c.desc}</p>
              <span className="text-xs text-primary font-semibold flex items-center gap-1">
                View Course <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* TradingView */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-bold heading-font mb-2">Essential Tool: TradingView</h3>
          <p className="text-sm text-muted-foreground mb-4">The charting platform I personally use for all my analysis. Advanced charts, indicators, and multi-timeframe analysis.</p>
          <a href={AFFILIATE_LINKS.tradingView} target="_blank" rel="noopener noreferrer" className="cta-gold px-6 py-3 inline-flex items-center gap-2">
            Get TradingView <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
