import bcrypt from "bcryptjs";
import type { HydratedDocument } from "mongoose";

import type { AuthUser, LoginInput, LoginResponse } from "../../types/shared.js";
import { AppError } from "../../utils/app-error.js";
import { signToken } from "../../utils/jwt.js";
import { User, type UserModel } from "./user.model.js";

const sanitizeUser = (user: Pick<HydratedDocument<UserModel>, "_id" | "email">): AuthUser => ({
  id: user._id.toString(),
  email: user.email
});

export const loginUser = async ({ email, password }: LoginInput): Promise<LoginResponse> => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    user: sanitizeUser(user),
    token: signToken({ sub: user._id.toString(), email: user.email })
  };
};

