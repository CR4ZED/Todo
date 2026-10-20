import { AppError } from "../../utils/AppError";
import { Todo } from "./todo.model";
import type { CreateTodoInput, ListTodosQuery, UpdateTodoInput } from "./todo.schema";

const notFound = () => new AppError(404, "TODO_NOT_FOUND", "Todo not found");

export async function create(input: CreateTodoInput) {
  return Todo.create(input);
}

// Cursor pagination: newest first by _id; cursor = last _id of the previous page.
export async function list({ limit, cursor, done }: ListTodosQuery) {
  const filter: Record<string, unknown> = {};
  if (done !== undefined) filter.done = done;
  if (cursor) filter._id = { $lt: cursor };

  const rows = await Todo.find(filter).sort({ _id: -1 }).limit(limit + 1);
  const hasMore = rows.length > limit;
  const data = hasMore ? rows.slice(0, limit) : rows;
  return { data, nextCursor: hasMore ? data[data.length - 1]._id.toString() : null };
}

export async function getById(id: string) {
  const todo = await Todo.findById(id);
  if (!todo) throw notFound();
  return todo;
}

export async function update(id: string, input: UpdateTodoInput) {
  const todo = await Todo.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
  if (!todo) throw notFound();
  return todo;
}

export async function remove(id: string) {
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) throw notFound();
}
