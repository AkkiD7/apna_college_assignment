import { HydratedDocument, model, Schema } from "mongoose";

export interface UserModel {
  email: string;
  passwordHash: string;
}

export type UserDocument = HydratedDocument<UserModel>;

const userSchema = new Schema<UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const User = model<UserModel>("User", userSchema);

