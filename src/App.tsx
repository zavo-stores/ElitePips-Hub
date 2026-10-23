import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import SMCCourse from "./pages/SMCCourse";
import PriceActionCourse from "./pages/PriceActionCourse";
import Mentorship from "./pages/Mentorship";
import StartTrading from "./pages/StartTrading";
import TradingTools from "./pages/TradingTools";
import PropFirms from "./pages/PropFirms";
import TestimonialsPage from "./pages/TestimonialsPage";
import Contact from "./pages/Contact";
import AdminVisitors from "./pages/AdminVisitors";
import AdminReviews from "./pages/AdminReviews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/smc-course" element={<ProtectedRoute><SMCCourse /></ProtectedRoute>} />
            <Route path="/price-action" element={<ProtectedRoute><PriceActionCourse /></ProtectedRoute>} />
            <Route path="/mentorship" element={<ProtectedRoute><Mentorship /></ProtectedRoute>} />
            <Route path="/start-trading" element={<ProtectedRoute><StartTrading /></ProtectedRoute>} />
            <Route path="/tools" element={<ProtectedRoute><TradingTools /></ProtectedRoute>} />
            <Route path="/prop-firms" element={<ProtectedRoute><PropFirms /></ProtectedRoute>} />
            <Route path="/testimonials" element={<ProtectedRoute><TestimonialsPage /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/admin/visitors" element={<AdminRoute><AdminVisitors /></AdminRoute>} />
            <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
