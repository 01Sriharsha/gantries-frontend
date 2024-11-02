"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";
import { useAuthStore } from "@/state/auth-state";

type AuthContext = {
  isLoading: boolean;
};

const AuthContext = createContext({} as AuthContext);

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const { logout } = useAuthStore((s) => s);

  const [isLoading, setIsLoading] = useState(false);

  const getMeUser = async () => {
    setIsLoading(true);
    const { data, error } = await axios({
      method: "get",
      endpoint: "/auth/me",
    });
    setIsLoading(false);
    if (data) {
      return data.data;
    } else if (error) {
      logout();
      return error;
    }
  };

  useEffect(() => {
    getMeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
