import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { IOfficeReqValidation } from './@types/IAppearanceValidation';

export class OfficeReqValidation implements IOfficeReqValidation {
	validateCreateOffice = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(CreateOfficeDto, req.body);

		if (errors.length > 0) {
			throw new IllegalArgumentError('Invalid CreateOffice data', errors);
		}

		next();
	});

	validateUpdateOffice = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(UpdateOfficeDto, req.body);

		if (errors.length > 0) {
			throw new IllegalArgumentError('Invalid UpdateOffice data', errors);
		}

		next();
	});
}
