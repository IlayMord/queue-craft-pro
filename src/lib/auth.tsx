import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  email?: string;
  phone?: string;
  provider: "email" | "phone" | "gmail";
  password?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
};

interface AuthContextValue {
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  loginWithGmail: () => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  registerWithPhone: (phone: string) => Promise<void>;
  registerWithGmail: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const API_URL = "http://localhost:3001";

async function fetchUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("currentUser");
    if (id) {
      fetchUser(id).then((u) => setUser(u));
    }
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("שגיאה בחיבור");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const loginWithPhone = async (phone: string) => {
    const res = await fetch(`${API_URL}/auth/phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    if (!res.ok) throw new Error("שגיאה בחיבור");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const loginWithGmail = async () => {
    const res = await fetch(`${API_URL}/auth/gmail`, { method: "POST" });
    if (!res.ok) throw new Error("שגיאה בחיבור");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const registerWithEmail = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/register/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("האימייל כבר רשום");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const registerWithPhone = async (phone: string) => {
    const res = await fetch(`${API_URL}/register/phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    if (!res.ok) throw new Error("המספר כבר רשום");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const registerWithGmail = async () => {
    const res = await fetch(`${API_URL}/register/gmail`, { method: "POST" });
    if (!res.ok) throw new Error("שגיאה בהרשמה");
    const u: User = await res.json();
    localStorage.setItem("currentUser", u.id);
    setUser(u);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("שגיאה בעדכון");
    const u: User = await res.json();
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithPhone,
        loginWithGmail,
        registerWithEmail,
        registerWithPhone,
        registerWithGmail,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
