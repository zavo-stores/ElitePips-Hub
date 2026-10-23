import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { PRICE_ACTION_MODULES } from "@/data/constants";
import { TrendingUp } from "lucide-react";

export default function PriceActionCourse() {
  const beginnerModules = PRICE_ACTION_MODULES.filter((m) => m.level === "Beginner");
  const intermediateModules = PRICE_ACTION_MODULES.filter((m) => m.level === "Intermediate");
  const advancedModules = PRICE_ACTION_MODULES.filter((m) => m.level === "Advanced");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <TrendingUp className="w-4 h-4" /> 20 Free Modules
          </div>
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Price Action <span className="gold-text">Mastery</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The pure art of reading charts. Master candlesticks, patterns, support/resistance, and naked trading.
          </p>
        </div>
      </section>

      {[
        { title: "Beginner", modules: beginnerModules },
        { title: "Intermediate", modules: intermediateModules },
        { title: "Advanced", modules: advancedModules },
      ].map((section) => (
        <section key={section.title} className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold heading-font mb-6 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            {section.title} Level
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.modules.map((m) => (
              <CourseCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
