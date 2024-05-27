import { Schema, model } from 'mongoose';

import { Todo, Subtask } from '@realtime-todo/types';

const subtaskSchema = new Schema<Subtask>(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    order: { type: Number, required: true },
    subtasks: { type: [subtaskSchema], default: [] },
  },
  { timestamps: true }
);

export const TodoModel = model<Todo>('Todo', todoSchema);
export const SubtaskModel = model<Subtask>('Subtask', subtaskSchema);
