import { model, Schema, type HydratedDocument } from "mongoose";

import type { ProblemResponse } from "../../types/shared.js";

export interface TopicModel {
  slug: string;
  title: string;
  order: number;
  problems: ProblemResponse[];
}

export type TopicDocument = HydratedDocument<TopicModel>;

const problemSchema = new Schema<ProblemResponse>(
  {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },
    youtubeLink: {
      type: String,
      required: true
    },
    leetcodeLink: {
      type: String,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

const topicSchema = new Schema<TopicModel>(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    problems: {
      type: [problemSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Topic = model<TopicModel>("Topic", topicSchema);

