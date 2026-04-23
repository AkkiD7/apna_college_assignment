import type { LoginInput } from "../../types/shared.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { loginUser } from "./auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validatedBody as LoginInput);

  res.status(200).json(result);
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.user!
  });
});
