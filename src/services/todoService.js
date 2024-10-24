const Todo = require("../models/todoModel");

const { NotFoundError, AccountLockedError } = require("../middlewares/errorHandler");

const getAllTodo = async (userId) => {
  const todos = await Todo.findAll(userId);
  if (todos.length === 0) {
    throw new NotFoundError("No todo found");
  }
  return todos;
};

const getTodo = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  if (todo.userId !== userId) {
    throw new AccountLockedError("Access forbidden");
  }

  return todo;
};

const createTodo = async (userId, todo, description, isCompleted) => {
  const newTodo = await Todo.create(userId, todo, description, isCompleted);

  return newTodo;
};

const updateTodo = async (id, userId, todo, description, isCompleted) => {
  const todoData = await Todo.findById(id);
  if (!todoData) {
    throw new NotFoundError("Todo not found");
  }
  if (todoData.userId !== userId) {
    throw new AccountLockedError("Access forbidden");
  }
  const updatedTodo = await Todo.update(id, todo, description, isCompleted);

  return updatedTodo;
};

const deleteTodo = async (id, userId) => {
  const todo = await Todo.delete(id, userId);
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
};

module.exports = {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
