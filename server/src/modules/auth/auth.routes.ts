import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { login, me } from "./auth.controller.js";
import { loginSchema } from "./auth.schema.js";

const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/me", requireAuth, me);

export { authRouter };

