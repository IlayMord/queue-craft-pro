import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { UserCircle } from "lucide-react";

export function ProfileDialog() {
  const { user, updateUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUser(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="hidden sm:inline">פרופיל</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rtl:text-right">
        <DialogHeader>
          <DialogTitle>עריכת פרופיל</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={form.avatar} alt="" />
              <AvatarFallback>{form.firstName?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <Input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="קישור לתמונת פרופיל"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstName">שם פרטי</Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">שם משפחה</Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">שם משתמש</Label>
            <Input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">אימייל</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">טלפון</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-gradient-primary hover:opacity-90"
            onClick={handleSave}
          >
            שמור
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
