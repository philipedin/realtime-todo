import { Schema, model } from 'mongoose';

import { Todo } from '@realtime-todo/types';

const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = model<Todo>('Todo', todoSchema);
