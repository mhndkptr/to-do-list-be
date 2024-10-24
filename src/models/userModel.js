const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const User = {
  findAll: async () => {
    return await prisma.user.findMany();
  },
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  },
  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  create: async (data) => {
    return await prisma.user.create({ data });
  },
  update: async (id, name, email) => {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        email: email,
      },
    });
  },
  delete: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  },
};

module.exports = User;
