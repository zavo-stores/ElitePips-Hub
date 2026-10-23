import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollmentModal from "@/components/EnrollmentModal";
import { MENTORSHIP_PACKAGES, VIP_PACKAGES } from "@/data/constants";
import { Crown, Sparkles } from "lucide-react";

export default function Mentorship() {
  const [modal, setModal] = useState<{
    packageType: string;
    packageName: string;
    packagePrice: string;
    paymentUrl: string;
  } | null>(null);

  const openEnrollment = (type: string, label: string, price: number, period: string) => {
    setModal({
      packageType: type,
      packageName: label,
      packagePrice: `$${price}${period}`,
      paymentUrl: "https://paystack.shop/pay/t14kp-j2vx",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Mentorship & <span className="gold-text">VIP Signals</span>
          </h1>
          <p className="text-muted-foreground">Fill the enrollment form, select your package, and get instant access after payment.</p>
        </div>
      </section>

      {/* VIP Signals */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold heading-font">VIP Signals</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIP_PACKAGES.map((p) => (
            <div
              key={p.label}
              className={`glass-card p-6 text-center cursor-pointer ${p.featured ? "border-primary border-2" : ""}`}
              onClick={() => openEnrollment("VIP Signals", p.label, p.price, p.period)}
            >
              {p.featured && <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full mb-3 inline-block">BEST VALUE</span>}
              <p className="text-3xl font-bold heading-font">${p.price}</p>
              <p className="text-sm text-muted-foreground">{p.period || "Lifetime"}</p>
              <p className="text-xs text-primary mt-2">{p.label}</p>
              <button className="mt-4 w-full py-2 cta-gold text-sm">Enroll Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Mentorship */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold heading-font">Private Mentorship</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MENTORSHIP_PACKAGES.map((p) => (
            <div
              key={p.label}
              className={`glass-card p-6 text-center cursor-pointer ${p.featured ? "border-primary border-2" : ""}`}
              onClick={() => openEnrollment("Private Mentorship", p.label, p.price, p.period)}
            >
              {p.featured && <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full mb-3 inline-block">BEST VALUE</span>}
              <p className="text-3xl font-bold heading-font">${p.price}</p>
              <p className="text-sm text-muted-foreground">{p.period || "Lifetime"}</p>
              <p className="text-xs text-primary mt-2">{p.label}</p>
              <button className="mt-4 w-full py-2 cta-gold text-sm">Enroll Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold heading-font mb-4">What's Included</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            {[
              "1-on-1 mentorship sessions",
              "Daily trade setups & analysis",
              "Live market breakdowns",
              "Private WhatsApp group access",
              "Trade journal review",
              "Risk management coaching",
              "Prop firm preparation",
              "Lifetime community access (Lifetime plan)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <EnrollmentModal
          packageType={modal.packageType}
          packageName={modal.packageName}
          packagePrice={modal.packagePrice}
          paymentUrl={modal.paymentUrl}
          onClose={() => setModal(null)}
        />
      )}
      <Footer />
    </div>
  );
}
