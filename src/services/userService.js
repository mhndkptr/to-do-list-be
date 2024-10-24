const User = require("../models/userModel");

const { NotFoundError } = require("../middlewares/errorHandler");

const getAllUser = async () => {
  const users = await User.findAll();
  if (users.length === 0) {
    throw new NotFoundError("No user found");
  }
  return users;
};

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const createUser = async (name, email, password, password_confirmation) => {
  const newUser = await User.create(name, email, password);

  return newUser;
};

const updateUser = async (id, name, email) => {
  const user = await User.update(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const updatedUser = await User.update(id, name, email);

  return updatedUser;
};

const deleteUser = async (id) => {
  const user = await User.delete(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
