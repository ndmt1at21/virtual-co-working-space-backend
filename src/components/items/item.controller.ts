import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import {
	FindItemFilter,
	FindItemOptions,
	FindItemSort
} from './@types/FindAllItemsOptions';
import { IItemService } from './@types/IItemService';

export const ItemController = (itemService: IItemService) => {
	const getById = catchAsyncRequestHandler(async (req, res, next) => {
		const item = await itemService.findItemById(+req.params.id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { item }
		});
	});

	const getAll = catchAsyncRequestHandler(async (req, res, next) => {
		const findAllOptions = extractQueryFindAllOptions(req.query);
		const [items, pagination] = await itemService.findAllItems(
			findAllOptions
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { items, pagination }
		});
	});

	const create = catchAsyncRequestHandler(async (req, res, next) => {
		const errs = await validateRequestBody(CreateItemDto, req.body);
		if (errs.length > 0) throw errs;

		const createItemDto = req.body as CreateItemDto;
		const item = await itemService.createItem(createItemDto);

		res.status(HttpStatusCode.CREATED).json({
			code: HttpStatusCode.CREATED,
			data: { item }
		});
	});

	const updateById = catchAsyncRequestHandler(async (req, res, next) => {
		const errs = await validateRequestBody(CreateItemDto, req.body);
		if (errs.length > 0) throw errs;

		const updateItemDto = req.body as CreateItemDto;
		const item = await itemService.updateItemById(
			+req.params.id,
			updateItemDto
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { item }
		});
	});

	const deleteById = catchAsyncRequestHandler(async (req, res, next) => {
		await itemService.deleteItemById(+req.params.id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK
		});
	});

	function extractQueryFindAllOptions(originalQuery: any): FindItemOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: { includes: ['name', 'path'] }
		});

		const filter: FindItemFilter = {};
		const sort: FindItemSort = {};

		if (query.filter) {
			filter.name = query.filter.name;
			filter.path = query.filter.path;
		}

		if (query.sort) {
			sort.name = query.sort?.name?.order;
			sort.path = query.sort?.path?.order;
			sort.createdAt = query.sort?.created_at?.order;
			sort.updatedAt = query.sort?.updated_at?.order;
		}

		return {
			filter,
			sort,
			pageable: query.pageable
		};
	}

	return { getAll, getById, create, deleteById, updateById };
};
