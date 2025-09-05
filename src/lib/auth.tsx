import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  email?: string;
  phone?: string;
  provider: "email" | "phone" | "gmail";
  password?: string;
};

interface AuthContextValue {
  user: User | null;
  loginWithEmail: (email: string, password: string) => void;
  loginWithPhone: (phone: string) => void;
  loginWithGmail: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function loadUsers(): Record<string, User> {
  try {
    return JSON.parse(localStorage.getItem("users") || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User>) {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadCurrentUser(): User | null {
  const users = loadUsers();
  const id = localStorage.getItem("currentUser");
  return id ? users[id] || null : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadCurrentUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", user.id);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const loginWithEmail = (email: string, password: string) => {
    const users = loadUsers();
    const id = `email:${email}`;
    const existing = users[id];
    if (existing) {
      if (existing.password !== password) {
        throw new Error("סיסמה שגויה");
      }
      setUser(existing);
      return;
    }
    const newUser: User = { id, provider: "email", email, password };
    users[id] = newUser;
    saveUsers(users);
    setUser(newUser);
  };

  const loginWithPhone = (phone: string) => {
    const users = loadUsers();
    const id = `phone:${phone}`;
    const existing = users[id];
    if (existing) {
      setUser(existing);
      return;
    }
    const newUser: User = { id, provider: "phone", phone };
    users[id] = newUser;
    saveUsers(users);
    setUser(newUser);
  };

  const loginWithGmail = () => {
    const id = `gmail:${Date.now()}`;
    const users = loadUsers();
    const newUser: User = {
      id,
      provider: "gmail",
      email: "gmailUser@example.com",
    };
    users[id] = newUser;
    saveUsers(users);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithEmail, loginWithPhone, loginWithGmail, logout }}
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

