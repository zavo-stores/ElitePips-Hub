import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout>>();
  const currentVisitId = useRef<string | null>(null);

  // Check admin role
  const checkAdmin = async (userId: string) => {
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    setIsAdmin(!!data);
  };

  // Auto-logout on inactivity
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(async () => {
      if (session) {
        await supabase.auth.signOut();
        window.location.href = "/auth";
      }
    }, INACTIVITY_TIMEOUT);
  };

  // Track session duration
  const updateVisitDuration = async () => {
    if (currentVisitId.current) {
      const now = new Date().toISOString();
      await supabase.from("visitor_logs").update({
        session_end: now,
        duration_seconds: Math.floor((Date.now() - (sessionStartTime.current || Date.now())) / 1000),
      }).eq("id", currentVisitId.current);
    }
  };
  const sessionStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          setTimeout(() => checkAdmin(session.user.id), 0);
        } else {
          setIsAdmin(false);
        }

        // Log sign-in to visitor_logs
        if (event === "SIGNED_IN" && session?.user) {
          const u = session.user;
          sessionStartTime.current = Date.now();
          setTimeout(async () => {
            const { data } = await supabase.from("visitor_logs").insert({
              user_id: u.id,
              email: u.email ?? "",
              full_name: u.user_metadata?.full_name || u.user_metadata?.name || "",
              sign_in_method: u.app_metadata?.provider || "email",
              user_agent: navigator.userAgent,
            }).select("id").single();
            if (data) currentVisitId.current = data.id;
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        checkAdmin(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Inactivity timer
  useEffect(() => {
    if (!session) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart", "mousemove"];
    resetInactivityTimer();
    events.forEach(e => window.addEventListener(e, resetInactivityTimer));

    // Track duration on page unload
    const handleUnload = () => updateVisitDuration();
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") updateVisitDuration();
    });

    return () => {
      events.forEach(e => window.removeEventListener(e, resetInactivityTimer));
      window.removeEventListener("beforeunload", handleUnload);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [session]);

  const signOut = async () => {
    await updateVisitDuration();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
    }
