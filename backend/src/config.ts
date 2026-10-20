import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://localhost:27017/todo",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
