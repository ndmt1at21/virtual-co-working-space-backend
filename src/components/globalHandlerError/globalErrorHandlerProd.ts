import { ErrorRequestHandler } from 'express';
import { AppError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';

export const globalErrorHandlerProd: ErrorRequestHandler = (
	err: Error,
	req,
	res,
	next
) => {
	if (err instanceof AppError) {
		res.status(HttpStatusCode.OK).json({
			status: err.status,
			code: err.statusCode,
			message: err.message,
			errors: err.errors
		});

		return;
	}

	res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
		message: 'Something went wrong'
	});
};
