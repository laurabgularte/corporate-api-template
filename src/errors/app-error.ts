export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Acesso não autorizado") {
    super(message, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflito na solicitação") {
    super(message, 409);
  }
}
