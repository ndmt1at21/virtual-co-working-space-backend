import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { ILogger } from '../logger/@types/ILogger';
import { CreateItemCategoryDto } from './@types/dto/CreateItemCategory.dto';
import { UpdateItemCategoryDto } from './@types/dto/UpdateItemCategory,dto';
import { FindAllItemCategoriesOptions } from './@types/filter/FindAllItemCategoriesOptions';
import { IItemCategoryService } from './@types/IItemCategoryService';

export class ItemCategoryController {
	constructor(
		private itemCategoryService: IItemCategoryService,
		private logger: ILogger
	) {}

	createItemCategory = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Create item category with name ${req.body.name}`);

		const createDto = req.body as CreateItemCategoryDto;
		const createdItemCategory = await this.itemCategoryService.create({
			...createDto,
			creatorId: req.user!.id
		});

		this.logger.info(
			`Item category is created with id = ${createdItemCategory.id}`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { itemCategory: createdItemCategory }
		});
	});

	updateItemCategory = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Update item category with id = ${
				req.params.id
			}, update data = ${JSON.stringify(req.body)}`
		);

		const id = +req.params.id;
		const updateDto = req.body as UpdateItemCategoryDto;

		const updatedItemCategory =
			await this.itemCategoryService.updateItemCategoryById(
				id,
				updateDto
			);

		this.logger.info(
			`Item category with id = ${id} is updated successfully`
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { itemCategory: updatedItemCategory }
		});
	});

	getItemCategoryById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get item category with id = ${req.params.id}`);

		const id = +req.params.id;

		const itemCategory =
			await this.itemCategoryService.findItemCategoryById(id);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { itemCategory }
		});

		this.logger.info(`Item category with id = ${id} is found successfully`);

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAllItemCategories = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Get all item categories with query = ${JSON.stringify(req.query)}`
		);

		const findAllOptions = this.extractQueryFindAllOptions(req.query);

		const [itemCategories, paginationInfo] =
			await this.itemCategoryService.findAllItemCategories(
				findAllOptions
			);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { itemCategories, pagination: paginationInfo }
		});

		this.logger.info(
			`Get all item categories successfully with [totalCount = ${paginationInfo.totalCount}, count = ${paginationInfo.count}, page = ${paginationInfo.page}]`
		);

		res.status(HttpStatusCode.OK).json(resData);
	});

	deleteItemCategoryById = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(`Delete item category with id = ${req.params.id}`);

			const id = +req.params.id;
			await this.itemCategoryService.deleteItemCategoryById(id);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { id }
			});

			this.logger.info(
				`Item category with id = ${id} is deleted successfully`
			);

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	extractQueryFindAllOptions(
		originalQuery: any
	): FindAllItemCategoriesOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: { includes: ['name'] }
		});

		const options: FindAllItemCategoriesOptions = {};

		if (query.filter) {
			options.filter = {
				name: query.filter.name
			};
		}

		if (query.sort) {
			options.sort = {
				id: query.sort.id?.order,
				createdAt: query.sort.created_at?.order
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}
}
