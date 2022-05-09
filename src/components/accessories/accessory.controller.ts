import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAccessoriesOptions';
import { IAccessoryService } from './@types/IAccessoryService';

export const AccessoryController = (accessoryService: IAccessoryService) => {
	const createAccessory = catchAsyncRequestHandler(async (req, res, next) => {
		const createAccessoryDto = req.body;

		const accessory = await accessoryService.createAccessory({
			...createAccessoryDto,
			creatorId: req.user!.id
		});

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: accessory
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	const getAllAccessories = catchAsyncRequestHandler(
		async (req, res, next) => {
			const options = extractQueryFindAllOptions(req.query);

			const [accessories, pagination] =
				await accessoryService.findAccessories(options);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { accessories, pagination }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	const getAccessoryById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const accessoryId = +req.params.id;

			const accessory = await accessoryService.findAccessoryById(
				accessoryId
			);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: accessory
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	const updateAccessory = catchAsyncRequestHandler(async (req, res, next) => {
		const accessoryId = +req.params.id;
		const updateAccessoryDto = req.body;

		const accessory = await accessoryService.updateAccessoryById(
			accessoryId,
			updateAccessoryDto
		);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: accessory
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	const deleteAccessory = catchAsyncRequestHandler(async (req, res, next) => {
		const accessoryId = +req.params.id;

		await accessoryService.deleteAccessoryById(accessoryId);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				id: accessoryId
			}
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	function extractQueryFindAllOptions(
		originalQuery: any
	): FindAllAccessoriesOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: {
				includes: ['name', 'category_name', 'category_id']
			}
		});

		const options: FindAllAccessoriesOptions = {};

		if (query.filter) {
			const queryFilter = query.filter;

			options.filter = {
				name: queryFilter?.name,
				categoryName: queryFilter?.category_name,
				categoryId: queryFilter?.category_id
			};
		}

		if (query.sort) {
			const querySort = query.sort;

			options.sort = {
				name: querySort?.name?.order,
				categoryName: querySort?.category_name?.order,
				createdAt: querySort?.created_at?.order
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}

	return {
		createAccessory,
		getAllAccessories,
		getAccessoryById,
		updateAccessory,
		deleteAccessory
	};
};
