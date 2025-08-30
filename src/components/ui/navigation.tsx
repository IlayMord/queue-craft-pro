import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Home, Settings, Clock, BarChart3 } from "lucide-react";

interface NavigationProps {
  type: "user" | "business";
}

export function Navigation({ type }: NavigationProps) {
  const location = useLocation();

  const userNavItems = [
    { to: "/", icon: Home, label: "בית" },
    { to: "/search", icon: Calendar, label: "חיפוש עסקים" },
    { to: "/my-appointments", icon: Clock, label: "התורים שלי" },
  ];

  const businessNavItems = [
    { to: "/business", icon: BarChart3, label: "דשבורד" },
    { to: "/business/appointments", icon: Calendar, label: "תורים" },
    { to: "/business/schedule", icon: Clock, label: "לוח זמנים" },
    { to: "/business/settings", icon: Settings, label: "הגדרות" },
  ];

  const navItems = type === "user" ? userNavItems : businessNavItems;

  return (
    <nav className="flex items-center gap-2">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
          <Button
            key={to}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={cn(
              "gap-2 transition-all duration-200",
              isActive && "bg-primary text-primary-foreground shadow-soft"
            )}
            asChild
          >
            <Link to={to}>
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}