import mongoose from "mongoose";
import { connectDb } from "../db";
import { Todo } from "../modules/todos/todo.model";

async function main() {
  await connectDb();
  await Todo.deleteMany({});
  await Todo.create(Array.from({ length: 30 }, (_, i) => ({ title: `Todo ${i + 1}`, done: i % 3 === 0 })));
  console.log("Seeded 30 todos");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
