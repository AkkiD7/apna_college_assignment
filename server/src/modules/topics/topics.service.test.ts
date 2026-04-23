import type { Mock } from "vitest";

import { listTopics } from "./topics.service.js";
import { Topic } from "./topic.model.js";

vi.mock("./topic.model.js", () => ({
  Topic: {
    find: vi.fn()
  }
}));

describe("listTopics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns topics sorted by topic order and problem order", async () => {
    const sort = vi.fn().mockResolvedValue([
      {
        _id: {
          toString: () => "topic-2"
        },
        title: "Binary Search",
        slug: "binary-search",
        order: 2,
        problems: [
          { id: "b", title: "B", order: 2 },
          { id: "a", title: "A", order: 1 }
        ]
      }
    ]);

    (Topic.find as unknown as Mock).mockReturnValue({ sort });

    const topics = await listTopics();

    expect(sort).toHaveBeenCalledWith({ order: 1 });
    expect(topics[0].problems.map((problem) => problem.id)).toEqual(["a", "b"]);
  });
});

