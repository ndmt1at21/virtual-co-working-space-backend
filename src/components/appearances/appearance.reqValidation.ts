import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateAppearancesDto } from './@types/dto/CreateAppearance.dto';
import { IAppearanceValidation } from './@types/IAppearanceReqValidation';

export class AppearanceReqValidation implements IAppearanceValidation {
	validateCreateAppearance = catchAsyncRequestHandler(
		async (req, res, next) => {
			console.log(req);
			const errors = await validateRequestBody(
				CreateAppearancesDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid CreateAppearance data',
					errors
				);

			console.log('next in fn call');
			next();
		}
	);
}
