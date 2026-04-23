import type { AuthUser } from "./shared.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      validatedBody?: unknown;
    }
  }
}

export {};
