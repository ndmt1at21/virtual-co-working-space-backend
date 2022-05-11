import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateAppearanceDto } from './@types/dto/CreateAppearance.dto';

export const AppearanceReqValidation = () => {
	const validateCreateAppearance = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreateAppearanceDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid CreateAppearance data',
					errors
				);

			next();
		}
	);

	return { validateCreateAppearance };
};
