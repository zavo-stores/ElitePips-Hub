import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, BarChart3, Star, TrendingUp, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { TESTIMONIALS, PERFORMANCE_STATS, AFFILIATE_LINKS } from "@/data/constants";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(43,96%,56%,0.15), transparent 70%)" }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Star className="w-4 h-4" /> Rated 4.9/5 by 500+ Students
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold heading-font tracking-tight mb-6 leading-[1.1]">
              Master The Markets with{" "}
              <span className="gold-text">Precision & Profit</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Free professional SMC & Price Action courses • Private mentorship • VIP signals • Lot size calculator • Prop firm guidance
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300} direction="scale">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/smc-course" className="cta-gold px-8 py-4 text-lg flex items-center justify-center gap-2">
                Start Free SMC Course <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/mentorship" className="px-8 py-4 rounded-2xl border gold-border text-foreground font-semibold hover:bg-primary/10 transition-colors text-lg">
                Join Mentorship
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y gold-border py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {PERFORMANCE_STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100} direction="scale">
              <p className="text-2xl md:text-3xl font-bold heading-font gold-text">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-center mb-4">
            Why <span className="gold-text">ElitePipsHub?</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Everything you need to become a consistently profitable trader</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: "Free Courses", desc: "40+ video modules covering SMC & Price Action from beginner to pro" },
            { icon: Users, title: "Private Mentorship", desc: "1-on-1 guidance, live analysis, and personalized trade reviews" },
            { icon: BarChart3, title: "VIP Signals", desc: "High-accuracy trade signals with full analysis and risk management" },
            { icon: Shield, title: "Prop Firm Ready", desc: "Strategies specifically designed to pass FTMO & FundedNext challenges" },
          ].map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 100} direction="scale">
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Course previews */}
      <section className="py-20 border-t gold-border">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold heading-font text-center mb-12">
              Free Trading <span className="gold-text">Education</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <Link to="/smc-course" className="glass-card p-8 group cursor-pointer block h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold heading-font">Smart Money Concepts</h3>
                </div>
                <p className="text-muted-foreground mb-4">20 modules covering market structure, order blocks, liquidity, FVGs, kill zones, and professional SMC strategies.</p>
                <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Link to="/price-action" className="glass-card p-8 group cursor-pointer block h-full">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold heading-font">Price Action Mastery</h3>
                </div>
                <p className="text-muted-foreground mb-4">20 modules covering candlesticks, support/resistance, chart patterns, Fibonacci, news trading, and trading psychology.</p>
                <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials preview */}
      <section className="py-20 border-t gold-border">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-1 text-2xl text-primary mb-3">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                <span className="text-lg text-foreground ml-2">4.9/5</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold heading-font">
                What Our Students <span className="gold-text">Say</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 150}>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" loading="lazy" />
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.quote.slice(0, 150)}..."</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials" className="text-primary font-semibold hover:underline">View All Reviews →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t gold-border text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal direction="scale">
            <h2 className="text-3xl md:text-4xl font-bold heading-font mb-4">
              Ready to Start Your <span className="gold-text">Trading Journey?</span>
            </h2>
            <p className="text-muted-foreground mb-8">Join hundreds of successful traders who started with ElitePipsHub</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/start-trading" className="cta-gold px-8 py-4 text-lg flex items-center justify-center gap-2">
                Create Trading Account <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-2xl border gold-border text-foreground font-semibold hover:bg-primary/10 transition-colors text-lg">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Affiliate courses */}
      <section className="py-16 border-t gold-border">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold heading-font text-center mb-2">Premium Affiliate Courses</h2>
            <p className="text-center text-muted-foreground text-sm mb-8">Hand-picked courses from top educators</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "TradingView", url: AFFILIATE_LINKS.tradingView },
              { name: "School of Gods", url: "https://whop.com/schoolofgods/?a=sylvesterowinoowino" },
              { name: "Market Fluidity", url: "https://whop.com/market-fluidity-uni/?a=sylvesterowinoowino" },
              { name: "TomTrades", url: "https://whop.com/premium-membership-ba-890f/?a=sylvesterowinoowino" },
              { name: "NFX Trading", url: "https://whop.com/nfx/?a=sylvesterowinoowino" },
              { name: "Forex University", url: AFFILIATE_LINKS.forexUniversity },
            ].map((c, i) => (
              <ScrollReveal key={c.name} delay={i * 50} direction="scale">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl border gold-border text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors inline-block">
                  {c.name} →
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
