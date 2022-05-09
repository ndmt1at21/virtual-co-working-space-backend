import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateAccessoryCategoryDto } from './@types/dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './@types/dto/UpdateAccessoryCategory.dto';

export const AccessoryCategoryReqValidation = () => {
	const validateCreateAccessoryCategoryDto = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreateAccessoryCategoryDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid CreateAccessoryCategory data',
					errors
				);

			next();
		}
	);

	const validateUpdateAccessoryCategoryDto = catchAsyncRequestHandler(
		async (req, res, next) => {
			if (typeof +req.params.id !== 'number') {
				throw new IllegalArgumentError('Invalid accessory category id');
			}

			if (Object.keys(req.body).length === 0) {
				throw new IllegalArgumentError(
					'UpdateAccessoryCategory data is empty'
				);
			}

			const errors = await validateRequestBody(
				UpdateAccessoryCategoryDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid UpdateAccessoryCategory data',
					errors
				);

			next();
		}
	);

	return {
		validateCreateAccessoryCategoryDto,
		validateUpdateAccessoryCategoryDto
	};
};
