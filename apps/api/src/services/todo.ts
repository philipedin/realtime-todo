import { Model } from 'mongoose';

import { Todo, TodoUpdate } from '@realtime-todo/types';

export const createTodoService = (todoModel: Model<Todo>) => {
  const listTodos = async () => {
    return await todoModel.find().sort({ order: 1 });
  };

  const createTodo = async (title: string) => {
    const maxOrder = await todoModel.findOne().sort('-order');
    const order = maxOrder ? maxOrder.order + 1 : 0;
    const newTodo = new todoModel({ title, order });

    return await newTodo.save();
  };

  const updateTodo = async (id: string, update: TodoUpdate) => {
    return await todoModel.findByIdAndUpdate(id, update, { new: true });
  };

  const removeTodo = async (id: string) => {
    return await todoModel.findByIdAndDelete(id);
  };

  const reorderTodos = async (order: string[]) => {
    const operations = order.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    return await todoModel.bulkWrite(operations);
  };

  return {
    listTodos,
    createTodo,
    updateTodo,
    removeTodo,
    reorderTodos,
  };
};
