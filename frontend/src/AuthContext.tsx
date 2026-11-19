import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import api, { setApiToken } from "./api";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  function login(newToken: string) {
    setApiToken(newToken);
    setToken(newToken);
  }

  function logout() {
    setApiToken(null);
    setToken(null);
  }

  useEffect(() => {
    const id = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          error.config?.headers?.Authorization
        ) {
          setApiToken(null);
          setToken(null);
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(id);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
