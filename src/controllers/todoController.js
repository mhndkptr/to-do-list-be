const todoService = require("../services/todoService");
const jwt = require("jsonwebtoken");

const index = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    const userId = decoded.id;
    const todos = await todoService.getAllTodo(userId);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Todos successfully found",
      data: {
        todos: todos,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodo(id);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Todo successfully found",
      data: {
        todo: todo,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

const store = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    const userId = decoded.id;
    const { todo, description, isCompleted } = req.body;

    const newTodo = await todoService.createTodo(userId, todo, description, isCompleted);

    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      message: "Todo successfully created",
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

const update = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    const userId = decoded.id;
    const { id } = req.params;
    const { todo, description, isCompleted } = req.body;
    const updatedTodo = await todoService.updateTodo(id, userId, todo, description, isCompleted);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Todo successfully updated",
      data: {
        todo: updatedTodo,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

const destroy = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    const userId = decoded.id;
    const { id } = req.params;
    await todoService.deleteTodo(id, userId);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Todo successfully deleted",
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
