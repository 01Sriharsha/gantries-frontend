import { User } from "@/types";
import { create } from "zustand";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authenticate: (userData: User) => void;
  logout: () => void;
};

const storageKey = "_gantries";

const storedData =
  typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem(storageKey)!) as User)
    : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: storedData,
  isAuthenticated: !!storedData,

  authenticate: (userData: User) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
    localStorage.setItem(storageKey, JSON.stringify(userData));
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem(storageKey);
  },
}));
