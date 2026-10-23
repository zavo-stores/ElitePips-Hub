import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PERFORMANCE_STATS, TRADE_HISTORY } from "@/data/constants";
import { Trophy, TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink, Gift } from "lucide-react";

const PROP_FIRMS = [
  {
    name: "Funding Pips",
    url: "https://app.fundingpips.com/register?ref=61F7E77F",
    code: "61F7E77F",
    desc: "One of the fastest-growing prop firms with trader-friendly rules. Low drawdown limits, no time restrictions, and instant payouts. Scale up to $300K in funded capital.",
    features: ["Up to $300K funded", "No time limit", "80% profit split", "Instant payouts"],
    highlight: "Use code 61F7E77F at registration — it's auto-applied via our link!",
  },
  {
    name: "The5ers",
    url: "https://www.the5ers.com/?afmc=19ul",
    desc: "Pioneer in instant funding — get a funded account from day one without passing a challenge. Trusted by thousands of traders worldwide with transparent scaling plans.",
    features: ["Instant funding available", "Up to $4M scaling", "50-100% profit split", "Low targets"],
    highlight: "Sign up through our link to access exclusive instant funding options.",
  },
  {
    name: "Alpha Capital Group",
    url: "https://app.alphacapitalgroup.uk/signup/ACBKL",
    code: "ACBKL",
    desc: "UK-based prop firm with one of the highest profit splits in the industry. Simple evaluation, fast payouts, and excellent support for serious traders.",
    features: ["Up to 80% profit split", "UK-regulated", "Fast payouts", "Simple rules"],
    highlight: "Code ACBKL is auto-applied when you register through our link!",
  },
];

export default function PropFirms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Prop Firms & <span className="gold-text">Performance</span>
          </h1>
          <p className="text-muted-foreground">Verified trading results and recommended funded account programs</p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERFORMANCE_STATS.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="text-2xl font-bold heading-font gold-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trade History */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold heading-font">Recent Trade Results</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b gold-border text-muted-foreground text-xs">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Pair</th>
                  <th className="text-left p-4">Direction</th>
                  <th className="text-left p-4">Entry</th>
                  <th className="text-left p-4">TP</th>
                  <th className="text-left p-4">SL</th>
                  <th className="text-left p-4">Result</th>
                  <th className="text-left p-4">R:R</th>
                </tr>
              </thead>
              <tbody>
                {TRADE_HISTORY.map((t, i) => (
                  <tr key={i} className="border-b border-secondary/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 text-muted-foreground">{t.date}</td>
                    <td className="p-4 font-semibold">{t.pair}</td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1 ${t.direction === "Buy" ? "text-green-400" : "text-red-400"}`}>
                        {t.direction === "Buy" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {t.direction}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{t.entry}</td>
                    <td className="p-4 text-green-400">{t.tp}</td>
                    <td className="p-4 text-red-400">{t.sl}</td>
                    <td className="p-4 font-semibold text-primary">{t.result}</td>
                    <td className="p-4 text-muted-foreground">{t.rr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Prop firm links */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold heading-font">Get Funded</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROP_FIRMS.map((firm) => (
            <a
              key={firm.name}
              href={firm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 group hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{firm.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{firm.desc}</p>
              <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                {firm.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                <Gift className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-primary">{firm.highlight}</p>
              </div>
              <span className="text-primary text-sm flex items-center gap-1 font-semibold">
                Register Now <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
