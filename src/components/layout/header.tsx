import { Button } from "@/components/ui/button";
import { Calendar, LogOut } from "lucide-react";
import { ProfileDialog } from "@/components/auth/profile-dialog";
import { Navigation } from "@/components/ui/navigation";
import { LoginDialog } from "@/components/auth/login-dialog";
import { useAuth } from "@/lib/auth";

interface HeaderProps {
  userType?: "user" | "business";
  userName?: string;
  businessName?: string;
}

export function Header({ userType, userName, businessName }: HeaderProps) {
  const { user, logout } = useAuth();
  const isLoggedIn = userType !== undefined || !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">TORIM</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">ניהול תורים חכם</p>
          </div>
        </div>

        {/* Navigation - only when logged in */}
        {isLoggedIn && <Navigation type={userType} />}

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium">
                  {businessName || userName || user?.email || user?.phone || "משתמש"}
                </span>
                {userType !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    {userType === "business" ? "מנהל עסק" : "לקוח"}
                  </span>
                )}
              </div>
              <ProfileDialog />
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">יציאה</span>
              </Button>
            </>
          ) : (
            <>
              <LoginDialog />
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                הרשם
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}