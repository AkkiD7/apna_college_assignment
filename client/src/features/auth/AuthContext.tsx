import { createContext, useContext, useEffect, useState } from "react";

import { loginRequest, meRequest } from "./auth-api";
import { authStorage } from "./auth-storage";
import type { AuthProviderProps, AuthContextValue } from "../../types/auth";
import type { LoginCredentials, User } from "../../types/api";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const response = await meRequest(token);
        setUser(response.user);
      } catch {
        authStorage.clearToken();
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, [token]);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    authStorage.setToken(response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    authStorage.clearToken();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    token,
    user,
    login,
    logout,
    isBootstrapping,
    isAuthenticated: Boolean(token && user)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

