import { X, CreditCard } from "lucide-react";

interface PaymentModalProps {
  plan: string;
  price: string;
  onClose: () => void;
}

export default function PaymentModal({ plan, price, onClose }: PaymentModalProps) {
  const amount = price.replace(/[^0-9.]/g, "");
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sylvesterowinoowino31%40gmail.com&currency_code=USD&amount=${amount}&item_name=${encodeURIComponent(plan)}`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div className="relative bg-card border gold-border rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold heading-font mb-1">{plan}</h3>
        <p className="text-primary text-lg font-semibold mb-6">{price}</p>
        <p className="text-muted-foreground text-sm mb-6">Choose your payment method below</p>

        <div className="space-y-4">
          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border gold-border bg-secondary/50 hover:bg-primary/10 transition-colors group"
          >
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.622c2.196 0 3.705.58 4.486 1.724.345.506.563 1.086.646 1.723.087.666.034 1.457-.16 2.41l-.013.06v.53l.413.234c.35.186.63.406.845.662.305.363.502.81.586 1.328.087.533.059 1.152-.082 1.84-.163.788-.427 1.473-.785 2.037a4.09 4.09 0 0 1-1.225 1.28c-.472.312-1.032.536-1.667.666-.616.127-1.32.19-2.093.19H12.44a.96.96 0 0 0-.946.806l-.033.17-.56 3.544-.025.12a.96.96 0 0 1-.946.807H7.076Z" fill="#253B80"/>
              <path d="M19.544 7.803c-.01.063-.022.125-.035.19-.452 2.32-2.003 3.12-3.982 3.12h-1.008a.49.49 0 0 0-.484.415l-.515 3.27-.146.928a.258.258 0 0 0 .255.299h1.792c.212 0 .392-.154.426-.363l.018-.091.337-2.14.022-.118a.432.432 0 0 1 .426-.363h.268c1.735 0 3.093-.705 3.49-2.744.166-.852.08-1.563-.36-2.063a1.71 1.71 0 0 0-.504-.34Z" fill="#179BD7"/>
            </svg>
            <div className="flex-1">
              <p className="font-semibold">Pay with PayPal</p>
              <p className="text-xs text-muted-foreground">Visa / Mastercard • International</p>
            </div>
          </a>

          <a
            href="https://paystack.shop/pay/t14kp-j2vx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border gold-border bg-secondary/50 hover:bg-primary/10 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}>
                <svg viewBox="0 0 32 32" className="w-7 h-7">
                  <circle cx="16" cy="16" r="14" fill="#4CAF50"/>
                  <text x="16" y="13" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">M-</text>
                  <text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">PESA</text>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold">M-Pesa / Airtel Money / Cards</p>
              <p className="text-xs text-muted-foreground">Mobile Money / Visa / Mastercard</p>
            </div>
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          After payment, send proof via WhatsApp to gain access.
        </p>

        <button onClick={onClose} className="mt-4 w-full py-3 border border-muted-foreground/30 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}
