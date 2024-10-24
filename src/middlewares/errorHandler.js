class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 422;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    status: false,
    statusCode: errStatus,
    message: errMsg,
  });
};

class AccountLockedError extends Error {
  constructor(message) {
    super(message);
    this.name = "AccountLockedError";
    this.statusCode = 403;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AccountLockedError,
  InternalServerError,
  errorHandler,
};
