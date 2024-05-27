import { Model } from 'mongoose';

import { Todo, Subtask, TodoUpdate, SubtaskUpdate } from '@realtime-todo/types';

export const createTodoService = ({
  todoModel,
  subtaskModel,
}: {
  todoModel: Model<Todo>;
  subtaskModel: Model<Subtask>;
}) => {
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

  const createSubtask = async (todoId: string, title: string) => {
    const todo = await todoModel.findById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    const maxOrder = todo.subtasks.reduce((acc, subtask) => {
      return subtask.order > acc ? subtask.order : acc;
    }, 0);
    const newSubtask = new subtaskModel({ title, order: maxOrder + 1 });

    todo.subtasks.push(newSubtask);

    return await todo.save();
  };

  const updateSubtask = async (
    id: string,
    subtaskId: string,
    update: SubtaskUpdate
  ) => {
    if (update.title !== undefined) {
      return await todoModel.findOneAndUpdate(
        { _id: id, 'subtasks._id': subtaskId },
        { $set: { 'subtasks.$.title': update.title } },
        { new: true }
      );
    }

    if (update.done !== undefined) {
      return await todoModel.findOneAndUpdate(
        { _id: id, 'subtasks._id': subtaskId },
        { $set: { 'subtasks.$.done': update.done } },
        { new: true }
      );
    }
  };

  const removeSubtask = async (id: string, subtaskId: string) => {
    return await todoModel.findOneAndUpdate(
      { _id: id },
      { $pull: { subtasks: { _id: subtaskId } } },
      { new: true }
    );
  };

  return {
    listTodos,
    createTodo,
    updateTodo,
    removeTodo,
    reorderTodos,
    createSubtask,
    updateSubtask,
    removeSubtask,
  };
};
