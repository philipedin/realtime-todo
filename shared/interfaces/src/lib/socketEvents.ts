import * as z from 'zod';

import { Todo } from '@realtime-todo/types';

const createTodoSchema = z.object({ title: z.string() });

export interface ClientToServerEvents {
  createTodo: ({ title }: z.infer<typeof createTodoSchema>) => void;
  createFoo: ({ title }: z.infer<typeof createTodoSchema>) => void;
}

export interface ServerToClientEvents {
  todos: (todos: Todo[]) => void;
  error: ({ message }: { message: string }) => void;
}

export const clientToServerSchemas: Partial<Record<string, z.AnyZodObject>> = {
  createTodo: createTodoSchema,
};
