import { AppError } from "../../utils/app-error.js";
import { Topic } from "../topics/topic.model.js";
import { Progress } from "./progress.model.js";

export const getCompletedProblemIds = async (userId: string): Promise<string[]> => {
  const progressEntries = await Progress.find({ userId }).sort({ createdAt: 1 });

  return progressEntries.map((entry) => entry.problemId);
};

export const ensureProblemExists = async (problemId: string): Promise<void> => {
  const matchingTopic = await Topic.exists({
    "problems.id": problemId
  });

  if (!matchingTopic) {
    throw new AppError("Problem not found", 404);
  }
};

export const setProblemProgress = async ({
  userId,
  problemId,
  completed
}: {
  userId: string;
  problemId: string;
  completed: boolean;
}): Promise<string[]> => {
  await ensureProblemExists(problemId);

  if (completed) {
    await Progress.findOneAndUpdate(
      { userId, problemId },
      {
        $set: {
          completedAt: new Date()
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );
  } else {
    await Progress.findOneAndDelete({ userId, problemId });
  }

  return getCompletedProblemIds(userId);
};

