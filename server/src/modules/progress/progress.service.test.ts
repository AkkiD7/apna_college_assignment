import type { Mock } from "vitest";

import { AppError } from "../../utils/app-error.js";
import { Topic } from "../topics/topic.model.js";
import { Progress } from "./progress.model.js";
import { getCompletedProblemIds, setProblemProgress } from "./progress.service.js";

vi.mock("../topics/topic.model.js", () => ({
  Topic: {
    exists: vi.fn()
  }
}));

vi.mock("./progress.model.js", () => ({
  Progress: {
    find: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn()
  }
}));

const mockProgressList = (problemIds: string[]) => {
  const sort = vi.fn().mockResolvedValue(problemIds.map((problemId) => ({ problemId })));
  (Progress.find as unknown as Mock).mockReturnValue({ sort });
};

describe("progress.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns completed problem ids for a user", async () => {
    mockProgressList(["arrays-two-sum", "dp-house-robber"]);

    const completedProblemIds = await getCompletedProblemIds("user-1");

    expect(completedProblemIds).toEqual(["arrays-two-sum", "dp-house-robber"]);
  });

  it("upserts progress for a completed problem", async () => {
    (Topic.exists as unknown as Mock).mockResolvedValue(true);
    (Progress.findOneAndUpdate as unknown as Mock).mockResolvedValue({});
    mockProgressList(["arrays-two-sum"]);

    const completedProblemIds = await setProblemProgress({
      userId: "user-1",
      problemId: "arrays-two-sum",
      completed: true
    });

    expect(Progress.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: "user-1", problemId: "arrays-two-sum" },
      {
        $set: {
          completedAt: expect.any(Date)
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );
    expect(completedProblemIds).toEqual(["arrays-two-sum"]);
  });

  it("deletes progress when a problem is unchecked", async () => {
    (Topic.exists as unknown as Mock).mockResolvedValue(true);
    (Progress.findOneAndDelete as unknown as Mock).mockResolvedValue({});
    mockProgressList([]);

    const completedProblemIds = await setProblemProgress({
      userId: "user-1",
      problemId: "arrays-two-sum",
      completed: false
    });

    expect(Progress.findOneAndDelete).toHaveBeenCalledWith({
      userId: "user-1",
      problemId: "arrays-two-sum"
    });
    expect(completedProblemIds).toEqual([]);
  });

  it("throws when the problem does not exist", async () => {
    (Topic.exists as unknown as Mock).mockResolvedValue(false);

    await expect(
      setProblemProgress({
        userId: "user-1",
        problemId: "unknown-problem",
        completed: true
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

