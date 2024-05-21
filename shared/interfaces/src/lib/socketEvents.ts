import * as z from 'zod';

import { Todo } from '@realtime-todo/types';

const createTodoSchema = z.object({ title: z.string() });
const updateTodoSchema = z.object({ _id: z.string(), done: z.boolean() });

export interface ClientToServerEvents {
  createTodo: ({ title }: z.infer<typeof createTodoSchema>) => void;
  updateTodo: ({ _id, done }: z.infer<typeof updateTodoSchema>) => void;
}

export interface ServerToClientEvents {
  todos: (todos: Todo[]) => void;
  error: ({ message }: { message: string }) => void;
}

export const clientToServerSchemas: Partial<Record<string, z.AnyZodObject>> = {
  createTodo: createTodoSchema,
  updateTodo: updateTodoSchema,
};
