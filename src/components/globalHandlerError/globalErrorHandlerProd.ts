import { ErrorRequestHandler } from 'express';
import {
	IllegalArgumentError,
	NotFoundError,
	UnauthorizedError
} from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';

export const globalErrorHandlerProd: ErrorRequestHandler = (
	err: Error,
	req,
	res,
	next
) => {
	if (err instanceof NotFoundError) {
		res.status(HttpStatusCode.NOT_FOUND).json({
			message: err.message
		});

		return;
	}

	if (err instanceof IllegalArgumentError) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			message: err.message
		});

		return;
	}

	if (err instanceof UnauthorizedError) {
		res.status(HttpStatusCode.UNAUTHORIZED).json({
			message: err.message,
			stack: err.stack,
			error: err
		});

		return;
	}

	res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
		message: 'Something went wrong'
	});
};
