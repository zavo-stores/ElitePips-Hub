import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t gold-border py-12" style={{ background: "hsl(240 10% 3.9%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold heading-font">ElitePips<span className="gold-text">Hub</span></span>
            </div>
            <p className="text-sm text-muted-foreground">Professional forex trading education, mentorship, and tools to help you achieve financial freedom.</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/smc-course" className="hover:text-primary transition-colors">SMC Course</Link>
              <Link to="/price-action" className="hover:text-primary transition-colors">Price Action Course</Link>
              <Link to="/mentorship" className="hover:text-primary transition-colors">Mentorship</Link>
              <Link to="/tools" className="hover:text-primary transition-colors">Trading Tools</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-3">Trading</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/start-trading" className="hover:text-primary transition-colors">Create Account</Link>
              <Link to="/prop-firms" className="hover:text-primary transition-colors">Prop Firms</Link>
              <Link to="/testimonials" className="hover:text-primary transition-colors">Reviews</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="border-t gold-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ElitePipsHub • All rights reserved</p>
          <p className="mt-1 text-xs">Trading forex involves risk. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </footer>
  );
}
