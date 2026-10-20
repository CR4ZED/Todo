import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Todo = model("Todo", todoSchema);
