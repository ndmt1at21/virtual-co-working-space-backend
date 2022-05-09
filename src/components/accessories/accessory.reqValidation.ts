import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateAccessoryDto } from './@types/dto/CreateAccessory.dto';
import { UpdateAccessoryDto } from './@types/dto/UpdateAccessory.dto';

export const AccessoryReqValidation = () => {
	const validateCreateAccessory = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreateAccessoryDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid CreateAccessory data',
					errors
				);

			next();
		}
	);

	const validateUpdateAccessory = catchAsyncRequestHandler(
		async (req, res, next) => {
			if (typeof +req.params.id !== 'number') {
				throw new IllegalArgumentError('Invalid accessory id');
			}

			const errors = await validateRequestBody(
				UpdateAccessoryDto,
				req.body
			);

			if (errors.length > 0) {
				throw new IllegalArgumentError(
					'Invalid UpdateAccessory data',
					errors
				);
			}

			next();
		}
	);

	return { validateCreateAccessory, validateUpdateAccessory };
};
