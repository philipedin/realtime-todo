export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoUpdate = Partial<Pick<Todo, 'done' | 'title'>>;
