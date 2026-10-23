import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, LogOut, Users, Star, User, ChevronDown } from "lucide-react";
import { AFFILIATE_LINKS } from "@/data/constants";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/logo.png";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "SMC Course", path: "/smc-course" },
  { label: "Price Action", path: "/price-action" },
  { label: "Mentorship", path: "/mentorship" },
  { label: "Start Trading", path: "/start-trading" },
  { label: "Tools", path: "/tools" },
  { label: "Prop Firms", path: "/prop-firms" },
  { label: "Reviews", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  const displayEmail = user?.email || "";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "rgba(9,9,11,0.92)", backdropFilter: "blur(16px)", borderColor: "hsla(43,96%,56%,0.15)" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="md:hidden p-2 text-primary hover:bg-secondary rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="ElitePipsHub" className="w-8 h-8 rounded-xl" width={32} height={32} />
              <span className="text-xl font-bold heading-font tracking-tight">
                ElitePips<span className="gold-text">Hub</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-primary ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user && isAdmin && (
              <>
                <Link
                  to="/admin/visitors"
                  className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  Visitors
                </Link>
                <Link
                  to="/admin/reviews"
                  className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Star className="w-3.5 h-3.5" />
                  Reviews
                </Link>
              </>
            )}

            {/* User profile dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
                    {initials}
                  </div>
                  <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-card border gold-border rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-4 border-b border-secondary">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-sm font-bold text-primary">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{displayName}</p>
                            <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { signOut(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-secondary/80 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <a
              href={AFFILIATE_LINKS.kofi}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex cta-gold px-4 py-2 text-sm items-center gap-2"
            >
              <Coffee className="w-4 h-4" /> Support
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute inset-y-0 left-0 w-72 bg-card border-r gold-border p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold heading-font gold-text">MENU</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User info in mobile */}
            {user && (
              <div className="flex items-center gap-3 mb-6 p-3 bg-secondary/50 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${location.pathname === item.path ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <>
                  <Link
                    to="/admin/visitors"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Users className="w-4 h-4" />
                    Visitors
                  </Link>
                  <Link
                    to="/admin/reviews"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Star className="w-4 h-4" />
                    Reviews
                  </Link>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t gold-border space-y-2">
              <a href={AFFILIATE_LINKS.kofi} target="_blank" rel="noopener noreferrer" className="cta-gold w-full py-3 flex items-center justify-center gap-2 text-sm">
                <Coffee className="w-4 h-4" /> Support Us
              </a>
              {user && (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="w-full py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-destructive border border-muted-foreground/20 rounded-2xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
