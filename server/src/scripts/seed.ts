import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { seedDatabase } from "./seed-data.js";

const run = async () => {
  try {
    await connectDatabase(env.MONGODB_URI);
    await seedDatabase();
    await disconnectDatabase();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database", error);
    await disconnectDatabase();
    process.exitCode = 1;
  }
};

void run();

