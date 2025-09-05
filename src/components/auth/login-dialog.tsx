import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginDialog() {
  return (
    <Dialog>
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
              <Input id="login-email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">סיסמה</Label>
              <Input id="login-password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              התחבר
            </Button>
          </TabsContent>
          <TabsContent value="phone" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone">מספר טלפון</Label>
              <Input id="login-phone" type="tel" placeholder="050-123-4567" />
            </div>
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              שלח קוד
            </Button>
          </TabsContent>
            <TabsContent value="gmail" className="pt-4">
              <Button variant="outline" className="w-full">
                התחבר עם Gmail
              </Button>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
