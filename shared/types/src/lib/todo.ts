export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  order: number;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export type Subtask = Pick<Todo, 'title' | 'done' | 'order'>;

export type TodoUpdate = Partial<Pick<Todo, 'done' | 'title'>>;
