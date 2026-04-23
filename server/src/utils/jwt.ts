import jwt, { type JwtPayload } from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "./app-error.js";

interface AuthTokenPayload extends JwtPayload {
  sub: string;
  email: string;
}

export const signToken = (payload: { sub: string; email: string }): string =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d"
  });

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (typeof decoded === "string" || !decoded.sub || !decoded.email) {
    throw new AppError("Authentication required", 401);
  }

  return decoded as AuthTokenPayload;
};

