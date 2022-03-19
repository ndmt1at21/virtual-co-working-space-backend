import { HttpStatusCode } from '@src/constant/httpStatusCode';

export class AppError extends Error {
	isOperational: boolean;
	status: string;
	statusCode: number;
	message: string;
	errors: any[];

	constructor(statusCode: number, message: string, errors?: any[]) {
		super();

		this.isOperational = true;
		this.status = 'error';
		this.statusCode = statusCode;
		this.message = message;
		this.errors = errors || [];

		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string) {
		super(HttpStatusCode.NOT_FOUND, message);
	}
}

export class IllegalArgumentError extends AppError {
	constructor(message: string, errors?: any[]) {
		super(HttpStatusCode.BAD_REQUEST, message, errors);
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
