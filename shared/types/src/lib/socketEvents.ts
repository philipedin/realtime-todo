import { Todo } from './todo';

export interface ClientToServerEvents {
  createTodo: ({ title }: Pick<Todo, 'title'>) => void;
}

export interface ServerToClientEvents {
  todos: (todos: Todo[]) => void;
}
