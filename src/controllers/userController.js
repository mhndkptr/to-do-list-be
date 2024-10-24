const userService = require("../services/userService");

const index = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Users successfully found",
      data: {
        users: users,
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
    const user = await userService.getUser(id);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "User successfully found",
      data: {
        user: user,
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
    const { name, email, password, password_confirmation } = req.body;

    const newUser = await userService.createUser(name, email, password, password_confirmation);

    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      message: "User successfully created",
      data: {
        user: newUser,
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
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(id, name, email);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "User successfully updated",
      data: {
        user: updatedUser,
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
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "User successfully deleted",
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
