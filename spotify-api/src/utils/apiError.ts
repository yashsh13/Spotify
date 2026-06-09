import { type ResponseDataType } from "./apiResponse.js";

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errors: ResponseDataType | undefined;

    constructor(message: string, statusCode: number, errors?: ResponseDataType){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = "Something", errors?: ResponseDataType){
        super(`${resource} not found`, 404, errors);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized", errors?: ResponseDataType){
        super(message, 401, errors);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Forbidden", errors?: ResponseDataType){
        super(message, 403, errors);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict occured", errors?: ResponseDataType){
        super(message, 409, errors);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Validation failed", errors?: ResponseDataType){
        super(message, 422, errors);
    }
}