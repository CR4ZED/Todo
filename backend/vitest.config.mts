import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: { MONGO_URI: "mongodb://localhost:27017/todo_test" },
  },
});
