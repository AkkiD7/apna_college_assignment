import { model, Schema, type HydratedDocument, type Types } from "mongoose";

export interface ProgressModel {
  userId: Types.ObjectId;
  problemId: string;
  completedAt: Date;
}

export type ProgressDocument = HydratedDocument<ProgressModel>;

const progressSchema = new Schema<ProgressModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    problemId: {
      type: String,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

progressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export const Progress = model<ProgressModel>("Progress", progressSchema);

