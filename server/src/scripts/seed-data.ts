import bcrypt from "bcryptjs";

import { env } from "../config/env.js";
import { topicSeed } from "../data/topics.js";
import { User } from "../modules/auth/user.model.js";
import { Topic } from "../modules/topics/topic.model.js";
import type { ProblemResponse, TopicSeed } from "../types/shared.js";

const addProblemOrder = (topics: TopicSeed[]): Array<{
  slug: string;
  title: string;
  order: number;
  problems: ProblemResponse[];
}> =>
  topics.map((topic) => ({
    ...topic,
    problems: topic.problems.map((problem, index) => ({
      ...problem,
      order: index + 1
    }))
  }));

export const seedTopics = async () => {
  const topics = addProblemOrder(topicSeed);

  await Topic.bulkWrite(
    topics.map((topic) => ({
      updateOne: {
        filter: { slug: topic.slug },
        update: {
          $set: topic
        },
        upsert: true
      }
    }))
  );
};

export const seedDemoUser = async () => {
  const normalizedEmail = env.SEED_DEMO_USER_EMAIL.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return;
  }

  const passwordHash = await bcrypt.hash(env.SEED_DEMO_USER_PASSWORD, 10);

  await User.create({
    email: normalizedEmail,
    passwordHash
  });
};

export const seedDatabase = async () => {
  await seedTopics();
  await seedDemoUser();
};

