import { Schema, model } from 'mongoose';
import { Todo } from '@realtime-todo/types';

import { subtaskSchema } from './subtask';

export const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    order: { type: Number, required: true },
    subtasks: { type: [subtaskSchema], default: [] },
  },
  { timestamps: true }
);

export const TodoModel = model<Todo>('Todo', todoSchema);
