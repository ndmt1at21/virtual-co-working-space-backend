import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateItemCategoryDto } from './@types/dto/CreateItemCategory.dto';
import { UpdateItemCategoryDto } from './@types/dto/UpdateItemCategory,dto';
import { IItemCategoryReqValidation } from './@types/IItemCategoryReqValidation';

export class ItemCategoryReqValidation implements IItemCategoryReqValidation {
	validateCreateItemCategoryDto = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreateItemCategoryDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid CreateItemCategory data',
					errors
				);

			next();
		}
	);

	validateUpdateItemCategoryDto = catchAsyncRequestHandler(
		async (req, res, next) => {
			if (typeof +req.params.id !== 'number') {
				throw new IllegalArgumentError('Invalid accessory category id');
			}

			if (Object.keys(req.body).length === 0) {
				throw new IllegalArgumentError(
					'UpdateItemCategory data is empty'
				);
			}

			const errors = await validateRequestBody(
				UpdateItemCategoryDto,
				req.body
			);

			if (errors.length > 0)
				throw new IllegalArgumentError(
					'Invalid UpdateItemCategory data',
					errors
				);

			next();
		}
	);
}
