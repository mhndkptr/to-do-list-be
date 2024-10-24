const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const { ValidationError, AuthenticationError } = require("../middlewares/errorHandler");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const generateUserToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.APP_JWT_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (userData) => {
  const { error } = userSchema.validate(userData);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }

  const { email, password } = userData;
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new ValidationError("Email already in use");
  }

  const newUser = await User.create({
    ...userData,
    password: await bcrypt.hash(userData.password, 10),
  });
  const token = generateUserToken(newUser);
  return { token: token, user: newUser };
};

const login = async (loginData) => {
  const { error } = loginSchema.validate(loginData);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }

  const { email, password } = loginData;
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AuthenticationError("Invalid password");
  }

  const token = generateUserToken(user);
  return { token: token, user: user };
};

module.exports = {
  register,
  login,
};
