type ErrorType =
  | "UserExists"
  | "UserNotFound"
  | "Unauthorized"
  | "CrawlBookNotFound"
  | "BadRequest"
  | "BookNotFound";

interface ErrorInfo {
  message: string;
  statusCode: number;
}

const ERRORS: Record<ErrorType, ErrorInfo> = {
  UserExists: {
    message: "User already exists",
    statusCode: 409,
  },
  UserNotFound: {
    message: "User not found",
    statusCode: 404,
  },
  Unauthorized: {
    message: "You are not authorized to access this resource",
    statusCode: 401,
  },
  CrawlBookNotFound: {
    message: "Book not found",
    statusCode: 404,
  },
  BadRequest: {
    message: "Bad Request",
    statusCode: 400,
  },
  BookNotFound: {
    message: "Book not found",
    statusCode: 404,
  },
};

export default class AppError extends Error {
  statusCode: number;
  name: string;
  constructor(errorType: ErrorType) {
    super(ERRORS[errorType].message);
    this.statusCode = ERRORS[errorType].statusCode;
    this.name = errorType;
  }
}
