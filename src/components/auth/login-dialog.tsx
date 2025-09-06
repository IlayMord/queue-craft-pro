import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { isValidEmail, isValidPhone } from "@/lib/validators";

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { loginWithEmail, loginWithPhone, loginWithGmail } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!isValidEmail(email) || !password) {
      alert("נא להזין אימייל וסיסמה תקינים");
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async () => {
    if (!isValidPhone(phone)) {
      alert("נא להזין מספר טלפון תקין");
      return;
    }
    setLoading(true);
    try {
      await loginWithPhone(phone);
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGmailLogin = async () => {
    setLoading(true);
    try {
      await loginWithGmail();
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          התחבר
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>התחברות</DialogTitle>
          <DialogDescription>
            בחרי שיטת התחברות להמשך.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">אימייל</TabsTrigger>
            <TabsTrigger value="phone">טלפון</TabsTrigger>
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">אימייל</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">סיסמה</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleEmailLogin}
              disabled={loading}
            >
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
          </TabsContent>
          <TabsContent value="phone" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone">מספר טלפון</Label>
              <Input
                id="login-phone"
                type="tel"
                placeholder="050-123-4567"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handlePhoneLogin}
              disabled={loading}
            >
              {loading ? "שולח..." : "שלח קוד"}
            </Button>
          </TabsContent>
          <TabsContent value="gmail" className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGmailLogin}
              disabled={loading}
            >
              {loading ? "מתחבר..." : "התחבר עם Gmail"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
