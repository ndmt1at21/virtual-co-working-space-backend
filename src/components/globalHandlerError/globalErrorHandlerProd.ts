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
		res.status(err.httpCode).json({
			message: err.message
		});

		return;
	}

	res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
		message: 'Something went wrong'
	});
};
