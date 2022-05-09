import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { ILogger } from '../logger/@types/ILogger';
import { CreateItemCategoryDto } from './@types/dto/CreateItemCategory.dto';
import { UpdateItemCategoryDto } from './@types/dto/UpdateItemCategory,dto';
import { IItemCategoryService } from './@types/IItemCategoryService';

export const ItemCategoryController = (
	itemCategoryService: IItemCategoryService,
	logger: ILogger
) => {
	const createItemCategory = catchAsyncRequestHandler(
		async (req, res, next) => {
			logger.info(`Create item category with name ${req.body.name}`);

			const createDto = req.body as CreateItemCategoryDto;
			const createdItemCategory = await itemCategoryService.create({
				...createDto,
				creatorId: req.user!.id
			});

			logger.info(
				`Item category is created with id = ${createdItemCategory.id}`
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { itemCategory: createdItemCategory }
			});
		}
	);

	const updateItemCategory = catchAsyncRequestHandler(
		async (req, res, next) => {
			logger.info(
				`Update item category with id = ${
					req.params.id
				}, update data = ${JSON.stringify(req.body)}`
			);

			const id = +req.params.id;
			const updateDto = req.body as UpdateItemCategoryDto;

			const updatedItemCategory =
				await itemCategoryService.updateItemCategoryById(id, updateDto);

			logger.info(
				`Item category with id = ${id} is updated successfully`
			);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { itemCategory: updatedItemCategory }
			});
		}
	);

	const getItemCategoryById = catchAsyncRequestHandler(
		async (req, res, next) => {
			logger.info(`Get item category with id = ${req.params.id}`);

			const id = +req.params.id;

			const itemCategory = await itemCategoryService.findItemCategoryById(
				id
			);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { itemCategory }
			});

			logger.info(`Item category with id = ${id} is found successfully`);

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	const getAllItemCategories = catchAsyncRequestHandler(
		async (req, res, next) => {
			logger.info(
				`Get all item categories with query = ${JSON.stringify(
					req.query
				)}`
			);

			const { pageable } = PaginateQueryParser.parse(req.query);

			const [itemCategories, paginationInfo] =
				await itemCategoryService.findAllItemCategories(pageable);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { itemCategories, paginationInfo }
			});

			logger.info(
				`Get all item categories successfully with [totalCount = ${paginationInfo.totalCount}, count = ${paginationInfo.count}, page = ${paginationInfo.page}]`
			);

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	return {
		createItemCategory,
		updateItemCategory,
		getItemCategoryById,
		getAllItemCategories
	};
};
