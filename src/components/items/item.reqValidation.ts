import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import { UpdateItemDto } from './@types/dto/UpdateItem.dto';
import { IItemReqValidation } from './@types/IItemReqValidation';

export class ItemReqValidation implements IItemReqValidation {
	validateCreateItemData = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errs = await validateRequestBody(CreateItemDto, req.body);
			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateUpdateItemData = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errs = await validateRequestBody(UpdateItemDto, req.body);
			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateItemId = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		if (!id) {
			throw new IllegalArgumentError('Id is not valid');
		}

		next();
	});
}
