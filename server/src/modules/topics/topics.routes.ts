import { Router } from "express";

import { getTopics } from "./topics.controller.js";

const topicsRouter = Router();

topicsRouter.get("/", getTopics);

export { topicsRouter };

