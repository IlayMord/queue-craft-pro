import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchBusinesses from "./pages/SearchBusinesses";
import BusinessDashboard from "./pages/BusinessDashboard";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import BusinessSettings from "./pages/BusinessSettings";
import BusinessReports from "./pages/BusinessReports";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchBusinesses />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/business/settings" element={<BusinessSettings />} />
          <Route path="/business/reports" element={<BusinessReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
