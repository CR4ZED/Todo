import { z } from "zod";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

export const idParams = z.object({ id: objectId });

export const createTodoBody = z.object({
  title: z.string().trim().min(1),
});

export const updateTodoBody = z.object({
  title: z.string().trim().min(1).optional(),
  done: z.boolean().optional(),
});

export const listTodosQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: objectId.optional(),
  done: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoBody>;
export type UpdateTodoInput = z.infer<typeof updateTodoBody>;
export type ListTodosQuery = z.infer<typeof listTodosQuery>;
