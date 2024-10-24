const AuthService = require("../services/authService");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { token, user } = await AuthService.register(req.body);
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      message: "User successfully registered",
      data: { token, user: user },
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

const login = async (req, res, next) => {
  try {
    const { token, user } = await AuthService.login(req.body);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Login successful",
      data: { token, user: user },
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

const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      message: "Logout feature is under developement",
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
  login,
  register,
  logout,
};
