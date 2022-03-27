import { ErrorRequestHandler } from 'express';
import { AppError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { serverLogger } from '../logger';

export const globalErrorHandlerProd: ErrorRequestHandler = (
	err: Error,
	req,
	res,
	next
) => {
	serverLogger.error(err);

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
