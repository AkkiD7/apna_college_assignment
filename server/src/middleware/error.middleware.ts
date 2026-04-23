import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

import { AppError } from "../utils/app-error.js";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Invalid request",
      issues: error.flatten()
    });
    return;
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message =
    statusCode >= 500 ? "Something went wrong" : error instanceof Error ? error.message : "Request failed";

  res.status(statusCode).json({
    message
  });
};

