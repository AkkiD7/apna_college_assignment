import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

export const validateBody = <TSchema extends ZodTypeAny>(schema: TSchema): RequestHandler => {
  return (req, _res, next) => {
    req.validatedBody = schema.parse(req.body);
    next();
  };
};

