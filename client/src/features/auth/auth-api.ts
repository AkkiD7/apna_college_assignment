import { apiRequest } from "../../utils/api-client";
import type { LoginCredentials, LoginResponse, MeResponse } from "../../types/api";

export const loginRequest = (credentials: LoginCredentials) =>
  apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

export const meRequest = (token: string) =>
  apiRequest<MeResponse>("/auth/me", {
    method: "GET",
    token
  });

