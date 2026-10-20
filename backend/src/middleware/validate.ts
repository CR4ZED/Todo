import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/AppError";

type Schemas = { body?: ZodType; query?: ZodType; params?: ZodType };

// Validates and replaces req.body / req.query / req.params with the parsed (coerced, defaulted) values.
export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, _res, next) => {
    for (const key of ["params", "query", "body"] as const) {
      const schema = schemas[key];
      if (!schema) continue;
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        return next(new AppError(400, "VALIDATION_ERROR", `Invalid ${key}`, result.error.issues));
      }
      (req as any)[key] = result.data;
    }
    next();
  };
