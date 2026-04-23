import type { ReactNode } from "react";

import type { LoginCredentials, User } from "./api";

export interface AuthContextValue {
  token: string | null;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  isBootstrapping: boolean;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

