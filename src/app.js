const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const todoRoute = require("./routes/todosRoute");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./middlewares/auth");
const multer = require("multer");
const authenticateUser = require("./middlewares/authenticateUser");
const { errorHandler } = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();
require("./middlewares/auth");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array("files"));

app.use("/todos", authenticateUser, todoRoute);
app.use("/users", authenticateUser, userRoute);
app.use("/auth", authRoute);
app.use(errorHandler);

module.exports = app;
