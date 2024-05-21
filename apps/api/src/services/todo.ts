import { Model } from 'mongoose';

import { Todo } from '@realtime-todo/types';

export const createTodoService = (todoModel: Model<Todo>) => {
  const listTodos = async () => {
    return await todoModel.find();
  };

  const createTodo = async (title: string) => {
    const newTodo = new todoModel({ title });
    return await newTodo.save();
  };

  const updateTodo = async (id: string, done: boolean) => {
    return await todoModel.findByIdAndUpdate(id, { done }, { new: true });
  };

  return {
    listTodos,
    createTodo,
    updateTodo,
  };
};
