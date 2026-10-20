import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

// Response shape: { error: { code, message, details? } }
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details } });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: { code: "DUPLICATE", message: "Duplicate value", details: err.keyValue } });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { code: "INVALID_JSON", message: "Malformed JSON body" } });
  }
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } });
};
