import * as z from 'zod';

import { Todo } from '@realtime-todo/types';

const createTodoSchema = z.object({ title: z.string() });
const updateTodoSchema = z.object({
  _id: z.string(),
  update: z
    .object({
      done: z.boolean(),
      title: z.string(),
    })
    .partial(),
});
const removeTodoSchema = z.object({
  _id: z.string(),
});
const reorderTodosSchema = z.object({
  order: z.array(z.string()),
});
const createSubtaskSchema = z.object({ todoId: z.string(), title: z.string() });
const updateSubtaskSchema = z.object({
  _id: z.string(),
  subtaskId: z.string(),
  update: z
    .object({
      done: z.boolean(),
      title: z.string(),
    })
    .partial(),
});
const removeSubtaskSchema = z.object({
  _id: z.string(),
  subtaskId: z.string(),
});

export interface ClientToServerEvents {
  createTodo: ({ title }: z.infer<typeof createTodoSchema>) => void;
  updateTodo: ({ _id, update }: z.infer<typeof updateTodoSchema>) => void;
  removeTodo: ({ _id }: z.infer<typeof removeTodoSchema>) => void;
  reorderTodos: ({ order }: z.infer<typeof reorderTodosSchema>) => void;
  createSubtask: ({ title }: z.infer<typeof createSubtaskSchema>) => void;
  updateSubtask: ({
    _id,
    subtaskId,
    update,
  }: z.infer<typeof updateSubtaskSchema>) => void;
  removeSubtask: ({
    _id,
    subtaskId,
  }: z.infer<typeof removeSubtaskSchema>) => void;
}

export interface ServerToClientEvents {
  todos: (todos: Todo[]) => void;
  error: ({ message }: { message: string }) => void;
}

export const clientToServerSchemas: Partial<Record<string, z.AnyZodObject>> = {
  createTodo: createTodoSchema,
  updateTodo: updateTodoSchema,
  removeTodo: removeTodoSchema,
  reorderTodos: reorderTodosSchema,
  createSubtask: createSubtaskSchema,
  updateSubtask: updateSubtaskSchema,
  removeSubtask: removeSubtaskSchema,
};
