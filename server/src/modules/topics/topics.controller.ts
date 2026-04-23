import { asyncHandler } from "../../utils/async-handler.js";
import { listTopics } from "./topics.service.js";

export const getTopics = asyncHandler(async (_req, res) => {
  const topics = await listTopics();

  res.status(200).json(topics);
});

