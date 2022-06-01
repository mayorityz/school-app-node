export class CustomHTTPError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomHTTPError {
  constructor(message) {
    super(message, 400);
  }
}

export class UnauthenticatedError extends CustomHTTPError {
  constructor(message) {
    super(message, 401);
  }
}

export class NotFoundError extends CustomHTTPError {
  constructor(message) {
    super(message, 404);
  }
}

export class ForbiddenError extends CustomHTTPError {
  constructor(message) {
    super(message, 403);
  }
}
