import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calculator, Info } from "lucide-react";

const PAIRS: Record<string, { label: string; category: string; pipValuePerLot: number; pipInfo: string }> = {
  XAUUSD: { label: "XAU/USD (Gold)", category: "Commodity", pipValuePerLot: 10, pipInfo: "1 pip = $0.10" },
  EURUSD: { label: "EUR/USD", category: "Major", pipValuePerLot: 10, pipInfo: "1 pip = 0.0001" },
  GBPUSD: { label: "GBP/USD", category: "Major", pipValuePerLot: 10, pipInfo: "1 pip = 0.0001" },
  USDJPY: { label: "USD/JPY", category: "Major", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  USDCHF: { label: "USD/CHF", category: "Major", pipValuePerLot: 10.6, pipInfo: "1 pip = 0.0001" },
  AUDUSD: { label: "AUD/USD", category: "Major", pipValuePerLot: 10, pipInfo: "1 pip = 0.0001" },
  USDCAD: { label: "USD/CAD", category: "Major", pipValuePerLot: 7.3, pipInfo: "1 pip = 0.0001" },
  NZDUSD: { label: "NZD/USD", category: "Major", pipValuePerLot: 10, pipInfo: "1 pip = 0.0001" },
  GBPJPY: { label: "GBP/JPY", category: "Cross", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  EURJPY: { label: "EUR/JPY", category: "Cross", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  EURGBP: { label: "EUR/GBP", category: "Cross", pipValuePerLot: 12.6, pipInfo: "1 pip = 0.0001" },
  AUDJPY: { label: "AUD/JPY", category: "Cross", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  CADJPY: { label: "CAD/JPY", category: "Cross", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  CHFJPY: { label: "CHF/JPY", category: "Cross", pipValuePerLot: 6.7, pipInfo: "1 pip = 0.01" },
  EURAUD: { label: "EUR/AUD", category: "Cross", pipValuePerLot: 6.4, pipInfo: "1 pip = 0.0001" },
  GBPAUD: { label: "GBP/AUD", category: "Cross", pipValuePerLot: 6.4, pipInfo: "1 pip = 0.0001" },
  EURNZD: { label: "EUR/NZD", category: "Cross", pipValuePerLot: 5.9, pipInfo: "1 pip = 0.0001" },
  XAGUSD: { label: "XAG/USD (Silver)", category: "Commodity", pipValuePerLot: 5, pipInfo: "1 pip = $0.001" },
  USOIL: { label: "US Oil (WTI)", category: "Commodity", pipValuePerLot: 10, pipInfo: "1 pip = $0.01" },
  BTCUSD: { label: "BTC/USD", category: "Crypto", pipValuePerLot: 1, pipInfo: "1 pip = $1.00" },
  ETHUSD: { label: "ETH/USD", category: "Crypto", pipValuePerLot: 1, pipInfo: "1 pip = $1.00" },
  US30: { label: "US30 (Dow Jones)", category: "Index", pipValuePerLot: 10, pipInfo: "1 pip = 1 point" },
  NAS100: { label: "NAS100 (Nasdaq)", category: "Index", pipValuePerLot: 1, pipInfo: "1 pip = 1 point" },
  SPX500: { label: "S&P 500", category: "Index", pipValuePerLot: 10, pipInfo: "1 pip = 1 point" },
};

export default function TradingTools() {
  const [pair, setPair] = useState("XAUUSD");
  const [balance, setBalance] = useState<string>("1000");
  const [riskPct, setRiskPct] = useState<string>("1");
  const [stopLoss, setStopLoss] = useState<string>("40");
  const [result, setResult] = useState<{
    lot: number;
    riskAmount: number;
    pipValuePerLot: number;
    dollarPerPip: number;
    microLots: number;
    miniLots: number;
  } | null>(null);

  const selectedPair = PAIRS[pair];
  const categories = [...new Set(Object.values(PAIRS).map((p) => p.category))];

  const calculateLot = useCallback(() => {
    const bal = parseFloat(balance);
    const risk = parseFloat(riskPct);
    const sl = parseFloat(stopLoss);

    if (!bal || bal <= 0 || !risk || risk <= 0 || !sl || sl <= 0) {
      setResult(null);
      return;
    }

    const riskAmount = (bal * risk) / 100;
    const pipVal = PAIRS[pair].pipValuePerLot;
    const lot = riskAmount / (sl * pipVal);
    const roundedLot = Math.floor(lot * 100) / 100;

    setResult({
      lot: roundedLot,
      riskAmount: Math.round(riskAmount * 100) / 100,
      pipValuePerLot: pipVal,
      dollarPerPip: Math.round(roundedLot * pipVal * 100) / 100,
      microLots: Math.round(roundedLot * 100),
      miniLots: Math.round(roundedLot * 10 * 10) / 10,
    });
  }, [balance, riskPct, stopLoss, pair]);

  // Auto-calculate whenever inputs change
  useEffect(() => {
    calculateLot();
  }, [calculateLot]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Trading <span className="gold-text">Tools</span>
          </h1>
          <p className="text-muted-foreground">Professional lot size calculator for proper risk management</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold heading-font">Lot Size Calculator</h2>
          </div>

          <div className="space-y-4">
            {/* Pair selector */}
            <div>
              <label className="block text-sm mb-2 text-muted-foreground">Currency Pair / Instrument</label>
              <select
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                {categories.map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {Object.entries(PAIRS)
                      .filter(([, v]) => v.category === cat)
                      .map(([key, v]) => (
                        <option key={key} value={key}>{v.label}</option>
                      ))}
                  </optgroup>
                ))}
              </select>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>{selectedPair.pipInfo} · Pip value: ${selectedPair.pipValuePerLot}/lot</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Balance ($)</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  min="1"
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Risk %</label>
                <input
                  type="number"
                  value={riskPct}
                  onChange={(e) => setRiskPct(e.target.value)}
                  min="0.1"
                  step="0.5"
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">SL (Pips)</label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  min="1"
                  className="w-full bg-secondary border border-input rounded-xl px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            {/* Results - always visible when valid */}
            {result && (
              <div className="mt-4 p-6 rounded-xl bg-background border gold-border animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Recommended Lot Size</p>
                  <p className="text-5xl font-bold heading-font gold-text">{result.lot.toFixed(2)}</p>
                  {result.lot < 0.01 && (
                    <p className="text-xs text-red-400 mt-1">⚠ Below minimum lot size (0.01). Consider increasing balance or risk %.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Risk Amount</p>
                    <p className="font-semibold text-primary">${result.riskAmount}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">$ per Pip</p>
                    <p className="font-semibold text-primary">${result.dollarPerPip}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Pip Value/Lot</p>
                    <p className="font-semibold">${result.pipValuePerLot}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Micro Lots</p>
                    <p className="font-semibold">{result.microLots}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  {PAIRS[pair].label} · {parseFloat(stopLoss)} pip SL · {parseFloat(riskPct)}% risk on ${parseFloat(balance)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="glass-card p-6 mt-6">
          <h3 className="font-bold heading-font mb-3">How It Works</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Formula:</strong> Lot Size = Risk Amount ÷ (Stop Loss in Pips × Pip Value per Lot)</p>
            <p><strong className="text-foreground">Example:</strong> $1,000 account, 1% risk, 40 pip SL on XAUUSD (Gold)</p>
            <p className="pl-4">Risk = $10 ÷ (40 × $10) = <span className="text-primary font-semibold">0.02 lots</span></p>
            <p className="text-xs mt-2">⚠ Pip values are approximate and may vary slightly between brokers. Always verify with your broker.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
