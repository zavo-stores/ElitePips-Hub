import { useState, useMemo } from "react";
import { X, Loader2, User, Mail, Phone, Globe, BookOpen, CreditCard, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AFFILIATE_LINKS } from "@/data/constants";

interface EnrollmentModalProps {
  packageType: string;
  packageName: string;
  packagePrice: string;
  paymentUrl: string;
  onClose: () => void;
}

const EXPERIENCE_LEVELS = [
  "Complete Beginner",
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "3+ years",
];

const PAYMENT_METHODS = [
  { id: "mpesa", label: "M-Pesa", icon: "mpesa", desc: "Safaricom mobile payment", type: "paystack" },
  { id: "airtel", label: "Airtel Money", icon: "airtel", desc: "Airtel mobile payment", type: "paystack" },
  { id: "card", label: "Visa / Mastercard", icon: "💳", desc: "Credit or debit card", type: "paystack" },
  { id: "paypal", label: "PayPal", icon: "paypal", desc: "International payment", type: "paypal" },
];

const COUNTRIES = [
  { name: "Afghanistan", code: "AF", phone: "+93", minLen: 9 },
  { name: "Albania", code: "AL", phone: "+355", minLen: 9 },
  { name: "Algeria", code: "DZ", phone: "+213", minLen: 9 },
  { name: "Angola", code: "AO", phone: "+244", minLen: 9 },
  { name: "Argentina", code: "AR", phone: "+54", minLen: 10 },
  { name: "Australia", code: "AU", phone: "+61", minLen: 9 },
  { name: "Austria", code: "AT", phone: "+43", minLen: 10 },
  { name: "Bahrain", code: "BH", phone: "+973", minLen: 8 },
  { name: "Bangladesh", code: "BD", phone: "+880", minLen: 10 },
  { name: "Belgium", code: "BE", phone: "+32", minLen: 9 },
  { name: "Botswana", code: "BW", phone: "+267", minLen: 7 },
  { name: "Brazil", code: "BR", phone: "+55", minLen: 10 },
  { name: "Cameroon", code: "CM", phone: "+237", minLen: 9 },
  { name: "Canada", code: "CA", phone: "+1", minLen: 10 },
  { name: "Chile", code: "CL", phone: "+56", minLen: 9 },
  { name: "China", code: "CN", phone: "+86", minLen: 11 },
  { name: "Colombia", code: "CO", phone: "+57", minLen: 10 },
  { name: "Congo (DRC)", code: "CD", phone: "+243", minLen: 9 },
  { name: "Côte d'Ivoire", code: "CI", phone: "+225", minLen: 10 },
  { name: "Denmark", code: "DK", phone: "+45", minLen: 8 },
  { name: "Egypt", code: "EG", phone: "+20", minLen: 10 },
  { name: "Ethiopia", code: "ET", phone: "+251", minLen: 9 },
  { name: "Finland", code: "FI", phone: "+358", minLen: 9 },
  { name: "France", code: "FR", phone: "+33", minLen: 9 },
  { name: "Germany", code: "DE", phone: "+49", minLen: 10 },
  { name: "Ghana", code: "GH", phone: "+233", minLen: 9 },
  { name: "Greece", code: "GR", phone: "+30", minLen: 10 },
  { name: "India", code: "IN", phone: "+91", minLen: 10 },
  { name: "Indonesia", code: "ID", phone: "+62", minLen: 10 },
  { name: "Ireland", code: "IE", phone: "+353", minLen: 9 },
  { name: "Israel", code: "IL", phone: "+972", minLen: 9 },
  { name: "Italy", code: "IT", phone: "+39", minLen: 10 },
  { name: "Jamaica", code: "JM", phone: "+1876", minLen: 7 },
  { name: "Japan", code: "JP", phone: "+81", minLen: 10 },
  { name: "Kenya", code: "KE", phone: "+254", minLen: 9 },
  { name: "Kuwait", code: "KW", phone: "+965", minLen: 8 },
  { name: "Lebanon", code: "LB", phone: "+961", minLen: 7 },
  { name: "Liberia", code: "LR", phone: "+231", minLen: 7 },
  { name: "Libya", code: "LY", phone: "+218", minLen: 9 },
  { name: "Malawi", code: "MW", phone: "+265", minLen: 8 },
  { name: "Malaysia", code: "MY", phone: "+60", minLen: 9 },
  { name: "Mali", code: "ML", phone: "+223", minLen: 8 },
  { name: "Mexico", code: "MX", phone: "+52", minLen: 10 },
  { name: "Morocco", code: "MA", phone: "+212", minLen: 9 },
  { name: "Mozambique", code: "MZ", phone: "+258", minLen: 9 },
  { name: "Namibia", code: "NA", phone: "+264", minLen: 9 },
  { name: "Netherlands", code: "NL", phone: "+31", minLen: 9 },
  { name: "New Zealand", code: "NZ", phone: "+64", minLen: 9 },
  { name: "Nigeria", code: "NG", phone: "+234", minLen: 10 },
  { name: "Norway", code: "NO", phone: "+47", minLen: 8 },
  { name: "Oman", code: "OM", phone: "+968", minLen: 8 },
  { name: "Pakistan", code: "PK", phone: "+92", minLen: 10 },
  { name: "Philippines", code: "PH", phone: "+63", minLen: 10 },
  { name: "Poland", code: "PL", phone: "+48", minLen: 9 },
  { name: "Portugal", code: "PT", phone: "+351", minLen: 9 },
  { name: "Qatar", code: "QA", phone: "+974", minLen: 8 },
  { name: "Romania", code: "RO", phone: "+40", minLen: 9 },
  { name: "Russia", code: "RU", phone: "+7", minLen: 10 },
  { name: "Rwanda", code: "RW", phone: "+250", minLen: 9 },
  { name: "Saudi Arabia", code: "SA", phone: "+966", minLen: 9 },
  { name: "Senegal", code: "SN", phone: "+221", minLen: 9 },
  { name: "Sierra Leone", code: "SL", phone: "+232", minLen: 8 },
  { name: "Singapore", code: "SG", phone: "+65", minLen: 8 },
  { name: "Somalia", code: "SO", phone: "+252", minLen: 7 },
  { name: "South Africa", code: "ZA", phone: "+27", minLen: 9 },
  { name: "South Korea", code: "KR", phone: "+82", minLen: 10 },
  { name: "South Sudan", code: "SS", phone: "+211", minLen: 9 },
  { name: "Spain", code: "ES", phone: "+34", minLen: 9 },
  { name: "Sri Lanka", code: "LK", phone: "+94", minLen: 9 },
  { name: "Sudan", code: "SD", phone: "+249", minLen: 9 },
  { name: "Sweden", code: "SE", phone: "+46", minLen: 9 },
  { name: "Switzerland", code: "CH", phone: "+41", minLen: 9 },
  { name: "Tanzania", code: "TZ", phone: "+255", minLen: 9 },
  { name: "Thailand", code: "TH", phone: "+66", minLen: 9 },
  { name: "Tunisia", code: "TN", phone: "+216", minLen: 8 },
  { name: "Turkey", code: "TR", phone: "+90", minLen: 10 },
  { name: "Uganda", code: "UG", phone: "+256", minLen: 9 },
  { name: "Ukraine", code: "UA", phone: "+380", minLen: 9 },
  { name: "United Arab Emirates", code: "AE", phone: "+971", minLen: 9 },
  { name: "United Kingdom", code: "GB", phone: "+44", minLen: 10 },
  { name: "United States", code: "US", phone: "+1", minLen: 10 },
  { name: "Vietnam", code: "VN", phone: "+84", minLen: 9 },
  { name: "Zambia", code: "ZM", phone: "+260", minLen: 9 },
  { name: "Zimbabwe", code: "ZW", phone: "+263", minLen: 9 },
];

export default function EnrollmentModal({
  packageType,
  packageName,
  packagePrice,
  paymentUrl,
  onClose,
}: EnrollmentModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"form" | "payment">("form");
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [experience, setExperience] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }, [countrySearch]);

  const validate = () => {
    const errs: Record<string, string> = {};

    // Full name: at least 2 words
    const nameParts = fullName.trim().split(/\s+/);
    if (!fullName.trim()) {
      errs.fullName = "Full name is required";
    } else if (nameParts.length < 2) {
      errs.fullName = "Please enter your full name (first & last name)";
    }

    // Email: proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!selectedCountry) errs.country = "Country is required";

    // Phone: correct length for country
    const digits = phoneNumber.replace(/\D/g, "");
    if (!digits) {
      errs.phone = "Phone number is required";
    } else if (selectedCountry && digits.length < selectedCountry.minLen) {
      errs.phone = `Phone number must be at least ${selectedCountry.minLen} digits for ${selectedCountry.name}`;
    } else if (digits.length > 15) {
      errs.phone = "Phone number is too long";
    }

    if (!experience) errs.experience = "Trading experience is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!user) return toast.error("Please sign in first");
    setSubmitting(true);

    try {
      const { error } = await supabase.from("enrollment_submissions").insert({
        user_id: user.id,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: `${selectedCountry!.phone} ${phoneNumber.trim()}`,
        country: selectedCountry!.name,
        trading_experience: experience,
        package_type: packageType,
        package_name: packageName,
        package_price: packagePrice,
      });

      if (error) throw error;
      toast.success("Enrollment submitted! Choose your payment method.");
      setStep("payment");
    } catch (err: any) {
      toast.error(err.message || "Enrollment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    const method = PAYMENT_METHODS.find(m => m.id === selectedPayment);
    if (!method) return;

    if (method.type === "paypal") {
      const amount = packagePrice.replace(/[^0-9.]/g, "");
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sylvesterowinoowino31%40gmail.com&currency_code=USD&amount=${amount}&item_name=${encodeURIComponent(packageName)}`;
      window.open(paypalUrl, "_blank");
    } else {
      window.open(paymentUrl, "_blank");
    }

    toast.success("After payment, you'll be connected to WhatsApp for access confirmation.");

    setTimeout(() => {
      window.open(AFFILIATE_LINKS.whatsappMentorship, "_blank");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div
        className="relative bg-card border gold-border rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold heading-font mb-1">Enroll Now</h3>
        <p className="text-primary text-sm font-semibold mb-1">{packageType} — {packageName}</p>
        <p className="text-2xl font-bold heading-font gold-text mb-4">{packagePrice}</p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex items-center gap-1.5 text-xs font-medium ${step === "form" ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "form" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>1</span>
            Details
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          <div className={`flex items-center gap-1.5 text-xs font-medium ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>2</span>
            Payment
          </div>
        </div>

        {step === "form" ? (
          <form onSubmit={handleFormSubmit} className="space-y-3">
            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Full Name (First & Last) *" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm" />
              </div>
              {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="Email Address *" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm" />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Country with search */}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <input
                type="text"
                placeholder="Search Country *"
                value={selectedCountry ? selectedCountry.name : countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setSelectedCountry(null);
                  setShowCountryDropdown(true);
                }}
                onFocus={() => setShowCountryDropdown(true)}
                className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
              />
              {showCountryDropdown && !selectedCountry && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border gold-border rounded-xl shadow-2xl max-h-48 overflow-y-auto z-50">
                  {filteredCountries.length === 0 ? (
                    <p className="p-3 text-xs text-muted-foreground">No countries found</p>
                  ) : (
                    filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountrySearch("");
                          setShowCountryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/80 flex justify-between items-center"
                      >
                        <span>{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.phone}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
              {errors.country && <p className="text-xs text-red-400 mt-1">{errors.country}</p>}
            </div>

            {/* Phone with auto country code */}
            <div>
              <div className="relative flex">
                <div className="flex items-center bg-secondary border border-input border-r-0 rounded-l-xl px-3 text-sm text-muted-foreground min-w-[80px] justify-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  {selectedCountry ? selectedCountry.phone : "+---"}
                </div>
                <input
                  type="tel"
                  placeholder={selectedCountry ? `${selectedCountry.minLen}+ digits *` : "Phone Number *"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={15}
                  className="w-full bg-secondary border border-input rounded-r-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Trading Experience */}
            <div>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select value={experience} onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm appearance-none">
                  <option value="">Trading Experience *</option>
                  {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              {errors.experience && <p className="text-xs text-red-400 mt-1">{errors.experience}</p>}
            </div>

            <button type="submit" disabled={submitting}
              className="w-full cta-gold py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Continue to Payment
            </button>
          </form>
        ) : (
          /* Payment method selection */
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Choose your preferred payment method:</p>

            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                    selectedPayment === method.id
                      ? "border-primary bg-primary/10"
                      : "border-input bg-secondary/50 hover:border-primary/50"
                  }`}
                >
                  {method.icon === "paypal" ? (
                    <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.622c2.196 0 3.705.58 4.486 1.724.345.506.563 1.086.646 1.723.087.666.034 1.457-.16 2.41l-.013.06v.53l.413.234c.35.186.63.406.845.662.305.363.502.81.586 1.328.087.533.059 1.152-.082 1.84-.163.788-.427 1.473-.785 2.037a4.09 4.09 0 0 1-1.225 1.28c-.472.312-1.032.536-1.667.666-.616.127-1.32.19-2.093.19H12.44a.96.96 0 0 0-.946.806l-.033.17-.56 3.544-.025.12a.96.96 0 0 1-.946.807H7.076Z" fill="#253B80"/>
                      <path d="M19.544 7.803c-.01.063-.022.125-.035.19-.452 2.32-2.003 3.12-3.982 3.12h-1.008a.49.49 0 0 0-.484.415l-.515 3.27-.146.928a.258.258 0 0 0 .255.299h1.792c.212 0 .392-.154.426-.363l.018-.091.337-2.14.022-.118a.432.432 0 0 1 .426-.363h.268c1.735 0 3.093-.705 3.49-2.744.166-.852.08-1.563-.36-2.063a1.71 1.71 0 0 0-.504-.34Z" fill="#179BD7"/>
                      <path d="M18.903 7.537a4.24 4.24 0 0 0-.523-.116 6.64 6.64 0 0 0-1.056-.077h-3.2a.43.43 0 0 0-.425.364l-.682 4.315-.02.124a.49.49 0 0 1 .484-.414h1.008c1.98 0 3.53-.804 3.982-3.128.013-.069.025-.135.035-.198a2.38 2.38 0 0 0-.604-.27Z" fill="#222D65"/>
                    </svg>
                  ) : method.icon === "mpesa" ? (
                    <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}>
                      <svg viewBox="0 0 32 32" className="w-7 h-7">
                        <circle cx="16" cy="16" r="14" fill="#4CAF50"/>
                        <text x="16" y="13" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">M-</text>
                        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">PESA</text>
                      </svg>
                    </div>
                  ) : method.icon === "airtel" ? (
                    <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #ED1C24, #B71C1C)" }}>
                      <svg viewBox="0 0 32 32" className="w-7 h-7">
                        <circle cx="16" cy="16" r="14" fill="#ED1C24"/>
                        <text x="16" y="14" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">airtel</text>
                        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">money</text>
                      </svg>
                    </div>
                  ) : (
                    <span className="text-2xl">{method.icon}</span>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedPayment}
              className="w-full cta-gold py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Pay {packagePrice}
            </button>

            <button
              onClick={() => setStep("form")}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back to details
            </button>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4 text-center">
          After payment, you'll be connected to WhatsApp for instant access confirmation.
        </p>
      </div>
    </div>
  );
}
