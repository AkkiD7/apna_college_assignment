import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedDatabase } from "./scripts/seed-data.js";
import { app } from "./app.js";

const startServer = async () => {
  try {
    await connectDatabase(env.MONGODB_URI);
    await seedDatabase();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void startServer();

