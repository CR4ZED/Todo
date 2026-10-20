import mongoose from "mongoose";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";
import { app } from "../src/app";
import { connectDb } from "../src/db";
import { Todo } from "../src/modules/todos/todo.model";

const title = `test-${Date.now()}`;

beforeAll(connectDb);

afterAll(async () => {
  await Todo.deleteMany({ title });
  await mongoose.disconnect();
});

it("creates, lists and completes todos", async () => {
  const api = request(app);

  const created = await api.post("/todos").send({ title });
  expect(created.status).toBe(201);
  expect(created.body).toMatchObject({ title, done: false });

  const list = await api.get("/todos?done=false&limit=1");
  expect(list.status).toBe(200);
  expect(list.body.data[0].title).toBe(title);

  const updated = await api.patch(`/todos/${created.body._id}`).send({ done: true });
  expect(updated.body.done).toBe(true);
});
