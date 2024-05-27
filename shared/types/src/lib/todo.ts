export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  order: number;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export type Subtask = Pick<Todo, '_id' | 'title' | 'done' | 'order'>;

export type TodoUpdate = Partial<Pick<Todo, 'done' | 'title'>>;
export type SubtaskUpdate = Partial<Pick<Subtask, 'done' | 'title'>>;
