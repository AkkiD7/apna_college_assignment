import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { getProgress, updateProgress } from "./progress.controller.js";
import { updateProgressSchema } from "./progress.schema.js";

const progressRouter = Router();

progressRouter.use(requireAuth);
progressRouter.get("/", getProgress);
progressRouter.post("/", validateBody(updateProgressSchema), updateProgress);

export { progressRouter };

