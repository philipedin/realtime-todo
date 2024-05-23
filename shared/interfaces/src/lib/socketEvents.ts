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

export interface ClientToServerEvents {
  createTodo: ({ title }: z.infer<typeof createTodoSchema>) => void;
  updateTodo: ({ _id, update }: z.infer<typeof updateTodoSchema>) => void;
  removeTodo: ({ _id }: z.infer<typeof removeTodoSchema>) => void;
  reorderTodos: ({ order }: z.infer<typeof reorderTodosSchema>) => void;
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
};
