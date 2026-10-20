import { app } from "./app";
import { config } from "./config";
import { connectDb } from "./db";

connectDb()
  .then(() => app.listen(config.port, () => console.log(`API on :${config.port}`)))
  .catch((err) => {
    console.error("Failed to start", err);
    process.exit(1);
  });
