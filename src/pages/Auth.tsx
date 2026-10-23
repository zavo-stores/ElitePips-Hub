import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User, Eye, EyeOff, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import logoImg from "@/assets/logo.png";

export default function Auth() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const isReset = searchParams.get("reset") === "true";
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "reset-password">(isReset ? "reset-password" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("eph_saved_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Listen for PASSWORD_RECOVERY event
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("reset-password");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't redirect if user is resetting password
  if (user && mode !== "reset-password") return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "reset-password") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setSubmitting(false);
          return;
        }
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          setSubmitting(false);
          return;
        }
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Password updated successfully! You can now sign in.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });
        if (error) throw error;
        toast.success("Password reset link sent! Check your email.");
        setMode("login");
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        localStorage.setItem("eph_saved_email", email.trim());
        toast.success("Welcome back!");
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        localStorage.setItem("eph_saved_email", email.trim());
        toast.success("Account created! Please check your email to verify.");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (result?.error) {
        toast.error(result.error.message || "Google sign in failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Google sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 30%, hsla(43,96%,56%,0.12), transparent 70%)" }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="ElitePipsHub" className="w-16 h-16 mx-auto rounded-2xl mb-4" />
          <h1 className="text-3xl font-bold heading-font">
            ElitePips<span className="gold-text">Hub</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "login" && "Sign in to access premium trading education"}
            {mode === "signup" && "Create your account to start your trading journey"}
            {mode === "forgot" && "Enter your email to receive a password reset link"}
            {mode === "reset-password" && "Set your new password below"}
          </p>
        </div>

        <div className="glass-card p-8">
          {(mode === "login" || mode === "signup") && (
            <>
              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border gold-border bg-secondary/50 hover:bg-primary/10 transition-colors font-medium mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">or continue with email</span>
                </div>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            )}

            {mode !== "reset-password" && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            )}

            {(mode === "login" || mode === "signup" || mode === "reset-password") && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "reset-password" ? "New Password" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-12 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {mode === "reset-password" && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full bg-secondary border border-input rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            )}

            {/* Forgot password link */}
            {mode === "login" && (
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-primary hover:underline w-full text-right -mt-1"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full cta-gold py-3 text-base font-semibold flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                mode === "forgot" || mode === "reset-password" ? <KeyRound className="w-4 h-4" /> : null
              )}
              {mode === "login" && "Sign In"}
              {mode === "signup" && "Create Account"}
              {mode === "forgot" && "Send Reset Link"}
              {mode === "reset-password" && "Update Password"}
            </button>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
            {mode === "forgot" ? (
              <p>
                Remember your password?{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                  Sign In
                </button>
              </p>
            ) : mode === "reset-password" ? (
              <p>
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                  Back to Sign In
                </button>
              </p>
            ) : (
              <p>
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline font-medium">
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
