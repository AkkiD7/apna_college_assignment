import type { RequestHandler } from "express";

import { User } from "../modules/auth/user.model.js";
import { AppError } from "../utils/app-error.js";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authorizationHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    req.user = {
      id: user._id.toString(),
      email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof Error && ["JsonWebTokenError", "TokenExpiredError"].includes(error.name)) {
      next(new AppError("Authentication required", 401));
      return;
    }

    next(error);
  }
};
