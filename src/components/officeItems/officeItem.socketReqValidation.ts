import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { IOfficeItemSocketReqValidation } from './@types/IOfficeItemSocketReqValidation';

export class OfficeItemSocketReqValidation
	implements IOfficeItemSocketReqValidation
{
	constructor() {}

	validateOfficeItemIdParams = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const id = context.params.id;

			if (!id) {
				throw new IllegalArgumentError('OfficeItem id is required');
			}

			next();
		}
	);

	validateCreateOfficeItemData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				CreateOfficeItemDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);
}
