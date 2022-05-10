import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { ILogger } from '../logger/@types/ILogger';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import {
	FindAllItemsFilter,
	FindAllItemsOptions,
	FindAllItemsSort
} from './@types/filter/FindAllItemsOptions';
import { IItemService } from './@types/IItemService';

export class ItemController {
	constructor(private itemService: IItemService, private logger: ILogger) {}

	getById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get item with id = ${req.params.id}`);

		const item = await this.itemService.findItemById(+req.params.id);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { item }
		});

		this.logger.info(`Item with id = ${req.params.id} is found`);

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAll = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Get all items with query = ${JSON.stringify(req.query)}`
		);

		const findAllOptions = this.extractQueryFindAllOptions(req.query);
		const [items, pagination] = await this.itemService.findAllItems(
			findAllOptions
		);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { items, pagination }
		});

		this.logger.info(
			`Get all items successfully with [totalCount = ${pagination.totalCount}, count = ${pagination.count}, page = ${pagination.page}]`
		);

		res.status(HttpStatusCode.OK).json(resData);
	});

	create = catchAsyncRequestHandler(async (req, res, next) => {
		const errs = await validateRequestBody(CreateItemDto, req.body);
		if (errs.length > 0) throw errs;

		this.logger.info(`Create item with data = ${JSON.stringify(req.body)}`);

		const createItemDto = req.body as CreateItemDto;
		const item = await this.itemService.createItem(createItemDto);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { item }
		});

		this.logger.info(`Item with id = ${item.id} is created`);

		res.status(HttpStatusCode.OK).json(resData);
	});

	updateById = catchAsyncRequestHandler(async (req, res, next) => {
		const errs = await validateRequestBody(CreateItemDto, req.body);
		if (errs.length > 0) throw errs;

		const updateItemDto = req.body as CreateItemDto;
		const item = await this.itemService.updateItemById(
			+req.params.id,
			updateItemDto
		);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { item }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	deleteById = catchAsyncRequestHandler(async (req, res, next) => {
		await this.itemService.deleteItemById(+req.params.id);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				id: +req.params.id
			}
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	private extractQueryFindAllOptions(
		originalQuery: any
	): FindAllItemsOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: { includes: ['name', 'path', 'category_id', 'created_at'] }
		});

		const filter: FindAllItemsFilter = {};
		const sort: FindAllItemsSort = {};

		const options: FindAllItemsOptions = {};

		if (query.filter) {
			options.filter = {
				name: query.filter.name,
				path: query.filter.path,
				categoryId: query.filter.category_id,
				createdAt: query.filter.created_at
			};
		}

		if (query.sort) {
			options.sort = {
				name: query.sort.name?.order,
				path: query.sort.path?.order,
				categoryName: query.sort.category_name?.order,
				createdAt: query.sort.created_at?.order,
				updatedAt: query.sort.updated_at?.order
			};
		}

		return {
			filter,
			sort,
			pageable: query.pageable
		};
	}
}
