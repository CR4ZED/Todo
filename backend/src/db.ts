import mongoose from "mongoose";
import { config } from "./config";

export async function connectDb() {
  await mongoose.connect(config.mongoUri);
  for (const sig of ["SIGINT", "SIGTERM"] as const) {
    process.once(sig, async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  }
}
