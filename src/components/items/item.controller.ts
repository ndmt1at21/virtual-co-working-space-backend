import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { pageParser } from '@src/utils/pageParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import { IItemService } from './@types/IItemService';

export const ItemController = (itemService: IItemService) => {
	const getAll = catchAsyncRequestHandler(async (req, res, next) => {
		const pageable = pageParser(req.query, {
			defaultPage: 1,
			defaultSize: 10
		});

		const items = await itemService.findAll(pageable);

		res.status(HttpStatusCode.OK).json(items);
	});

	const getById = catchAsyncRequestHandler(async (req, res, next) => {
		const item = await itemService.findById(req.params.id);
		res.status(HttpStatusCode.OK).json(item);
	});

	const create = catchAsyncRequestHandler(async (req, res, next) => {
		const err = await validateRequestBody(CreateItemDto, req.body);
		if (err) throw err;

		const createItemDto = req.body as CreateItemDto;
		const item = await itemService.create(createItemDto);

		res.status(HttpStatusCode.CREATED).json(item);
	});

	const deleteById = catchAsyncRequestHandler(async (req, res, next) => {});

	const updateById = catchAsyncRequestHandler(async (req, res, next) => {});

	return { getAll, getById, create, deleteById, updateById };
};
