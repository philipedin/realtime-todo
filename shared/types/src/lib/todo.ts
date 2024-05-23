export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoUpdate = Partial<Pick<Todo, 'done' | 'title'>>;
