const { AuthenticationError, AccountLockedError } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    throw new AuthenticationError("Unauthenticated");
  }

  jwt.verify(token, process.env.APP_JWT_SECRET, (err, user) => {
    if (err) {
      throw new AccountLockedError("Invalid token");
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateUser;
