import { HttpStatusCode } from '@src/constant/httpStatusCode';

export class AppError extends Error {
	isOperational: boolean;
	public httpCode: number;
	public message: string;

	constructor(httpCode: number, message: string) {
		super();

		this.isOperational = true;
		this.httpCode = httpCode;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string) {
		super(HttpStatusCode.NOT_FOUND, message);
	}
}

export class IllegalArgumentError extends AppError {
	constructor(message: string) {
		super(HttpStatusCode.BAD_REQUEST, message);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string) {
		super(HttpStatusCode.UNAUTHORIZED, message);
	}
}

export class TooManyRequestError extends AppError {
	constructor(message: string) {
		super(HttpStatusCode.TOO_MANY_REQUESTS, message);
	}
}
