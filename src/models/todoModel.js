const { PrismaClient } = require("@prisma/client");
const { AccountLockedError } = require("../middlewares/errorHandler");
const prisma = new PrismaClient();

const Todo = {
  findAll: async (userId) => {
    return await prisma.todo.findMany({
      where: { userId: userId },
    });
  },
  findById: async (id) => {
    return await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });
  },
  create: async (userId, todo, description, isCompleted) => {
    return await prisma.todo.create({
      data: {
        userId: userId,
        todo: todo,
        description: description,
        isCompleted: isCompleted === "true",
      },
    });
  },
  update: async (id, todo, description, isCompleted) => {
    const data = {};
    if (todo) {
      data.todo = todo;
    }
    if (description) {
      data.description = description;
    }
    if (typeof isCompleted === "boolean") {
      data.isCompleted = isCompleted;
    } else {
      data.isCompleted = isCompleted === "true";
    }
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data: data,
    });
  },
  delete: async (id, userId) => {
    const data = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });
    if (data.userId !== userId) {
      throw new AccountLockedError("Access forbidden");
    } else {
      return await prisma.todo.delete({
        where: { id: parseInt(id) },
      });
    }
  },
};

module.exports = Todo;
