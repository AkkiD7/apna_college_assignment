import cors, { type CorsOptions } from "cors";
import express from "express";

import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { progressRouter } from "./modules/progress/progress.routes.js";
import { topicsRouter } from "./modules/topics/topics.routes.js";

const buildCorsOrigin = (): CorsOptions["origin"] => {
  const allowedOrigins = env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim());

  return (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  };
};

export const app = express();

app.use(
  cors({
    origin: buildCorsOrigin(),
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.use("/api/auth", authRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/progress", progressRouter);

app.use(notFoundHandler);
app.use(errorHandler);

