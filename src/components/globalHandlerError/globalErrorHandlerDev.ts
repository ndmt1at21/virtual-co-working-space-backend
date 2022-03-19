import { ErrorRequestHandler } from 'express';
import { AppError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';

export const globalErrorHandlerDev: ErrorRequestHandler = (
	err: Error,
	req,
	res,
	next
) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			message: err.message,
			stack: err.stack,
			error: err
		});

		return;
	}

	res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
		message: err.message,
		stack: err.stack,
		error: err
	});
};
