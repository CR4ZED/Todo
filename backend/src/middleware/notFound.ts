import type { RequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const notFound: RequestHandler = (req) => {
  throw new AppError(404, "NOT_FOUND", `Route ${req.method} ${req.path} not found`);
};
