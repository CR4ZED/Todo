import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import todoRoutes from "./modules/todos/todo.routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "up" : "down" });
});

// register new module routers here
app.use("/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);
