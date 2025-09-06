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

export function RegisterDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const { registerWithEmail, registerWithPhone, registerWithGmail } = useAuth();

  const handleEmailRegister = async () => {
    if (password !== confirm) {
      alert("הסיסמאות אינן תואמות");
      return;
    }
    try {
      await registerWithEmail(email, password);
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const handlePhoneRegister = async () => {
    try {
      await registerWithPhone(phone);
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const handleGmailRegister = async () => {
    try {
      await registerWithGmail();
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-primary hover:opacity-90">
          הרשם
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>הרשמה</DialogTitle>
          <DialogDescription>
            צרי חשבון חדש בעזרת אימייל, טלפון או Gmail.
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
              <Label htmlFor="register-email">אימייל</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">סיסמה</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm">אימות סיסמה</Label>
              <Input
                id="register-confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleEmailRegister}
            >
              הרשם
            </Button>
          </TabsContent>
          <TabsContent value="phone" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="register-phone">מספר טלפון</Label>
              <Input
                id="register-phone"
                type="tel"
                placeholder="050-123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handlePhoneRegister}
            >
              הרשם
            </Button>
          </TabsContent>
          <TabsContent value="gmail" className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGmailRegister}
            >
              הירשם עם Gmail
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
