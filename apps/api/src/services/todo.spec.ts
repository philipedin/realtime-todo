import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createTodoService } from './todo';
import { TodoModel } from '../models/todo';
import { SubtaskModel } from '../models/subtask';

describe('TodoService', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await TodoModel.deleteMany({});
  });

  it('should list todos', async () => {
    const todoService = createTodoService({
      todoModel: TodoModel,
      subtaskModel: SubtaskModel,
    });
    const todo = new TodoModel({ title: 'Test Todo', order: 1 });
    const todo2 = new TodoModel({ title: 'Test Todo 2', order: 0 });
    await todo.save();
    await todo2.save();

    const todos = await todoService.listTodos();

    expect(todos).toHaveLength(2);
    expect(todos[1].title).toBe('Test Todo');
    expect(todos[0].title).toBe('Test Todo 2');
  });

  it('should create a todo', async () => {
    const todoService = createTodoService({
      todoModel: TodoModel,
      subtaskModel: SubtaskModel,
    });

    const todo = await todoService.createTodo('Test Todo');

    expect(todo).toHaveProperty('_id');
    expect(todo.title).toBe('Test Todo');
  });

  it('should update a todo', async () => {
    const todoService = createTodoService({
      todoModel: TodoModel,
      subtaskModel: SubtaskModel,
    });

    const todo = new TodoModel({ title: 'Test Todo', order: 1 });
    await todo.save();

    const updatedTodo = await todoService.updateTodo(todo._id, {
      title: 'Updated Todo',
    });

    expect(updatedTodo).not.toBeNull();
    if (updatedTodo) {
      expect(updatedTodo.title).toBe('Updated Todo');
    }
  });

  it('should remove a todo', async () => {
    const todoService = createTodoService({
      todoModel: TodoModel,
      subtaskModel: SubtaskModel,
    });

    const todo = new TodoModel({ title: 'Test Todo', order: 1 });
    await todo.save();

    await todoService.removeTodo(todo._id);

    const removedTodo = await TodoModel.findById(todo._id);
    expect(removedTodo).toBeNull();
  });

  it('should reorder todos', async () => {
    const todoService = createTodoService({
      todoModel: TodoModel,
      subtaskModel: SubtaskModel,
    });

    const todo1 = new TodoModel({ title: 'Test Todo 1', order: 0 });
    const todo2 = new TodoModel({ title: 'Test Todo 2', order: 1 });
    const todo3 = new TodoModel({ title: 'Test Todo 3', order: 2 });
    const todo4 = new TodoModel({ title: 'Test Todo 4', order: 3 });
    await todo1.save();
    await todo2.save();
    await todo3.save();
    await todo4.save();

    await todoService.reorderTodos([
      todo3._id,
      todo1._id,
      todo4._id,
      todo2._id,
    ]);

    const updatedTodo1 = await TodoModel.findById(todo1._id);
    const updatedTodo2 = await TodoModel.findById(todo2._id);
    const updatedTodo3 = await TodoModel.findById(todo3._id);
    const updatedTodo4 = await TodoModel.findById(todo4._id);

    expect(updatedTodo1).not.toBeNull();
    expect(updatedTodo2).not.toBeNull();
    expect(updatedTodo3).not.toBeNull();
    expect(updatedTodo4).not.toBeNull();

    if (updatedTodo1 && updatedTodo2 && updatedTodo3 && updatedTodo4) {
      expect(updatedTodo1.order).toBe(1);
      expect(updatedTodo2.order).toBe(3);
      expect(updatedTodo3.order).toBe(0);
      expect(updatedTodo4.order).toBe(2);
    }
  });
});
