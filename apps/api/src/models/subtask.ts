import { Schema, model } from 'mongoose';
import { Subtask } from '@realtime-todo/types';

export const subtaskSchema = new Schema<Subtask>({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  order: { type: Number, required: true },
});

export const SubtaskModel = model<Subtask>('Subtask', subtaskSchema);
