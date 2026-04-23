import type { TopicResponse } from "../../types/shared.js";
import { Topic } from "./topic.model.js";

export const listTopics = async (): Promise<TopicResponse[]> => {
  const topics = await Topic.find({}).sort({ order: 1 });

  return topics.map((topic) => ({
    id: topic._id.toString(),
    title: topic.title,
    slug: topic.slug,
    order: topic.order,
    problems: [...topic.problems].sort((left, right) => left.order - right.order)
  }));
};

