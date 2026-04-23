import mongoose from "mongoose";

export const connectDatabase = async (mongoUri: string) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

