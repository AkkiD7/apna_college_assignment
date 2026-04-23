import type { ProgressResponse, UpdateProgressInput } from "../../types/shared.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getCompletedProblemIds, setProblemProgress } from "./progress.service.js";

export const getProgress = asyncHandler(async (req, res) => {
  const completedProblemIds = await getCompletedProblemIds(req.user!.id);

  res.status(200).json({
    completedProblemIds
  } satisfies ProgressResponse);
});

export const updateProgress = asyncHandler(async (req, res) => {
  const completedProblemIds = await setProblemProgress({
    userId: req.user!.id,
    ...(req.validatedBody as UpdateProgressInput)
  });

  res.status(200).json({
    completedProblemIds
  } satisfies ProgressResponse);
});

