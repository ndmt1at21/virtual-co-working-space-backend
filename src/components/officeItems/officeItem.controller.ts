import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { pageParser } from '@src/utils/pageParser';
import { IOfficeItemService } from './@types/IOfficeItemService';

export const OfficeItemController = (officeItemService: IOfficeItemService) => {
	const getOfficeItemDetailById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const officeItemDto =
				await officeItemService.findOfficeItemDetailById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				officeItem: officeItemDto
			});
		}
	);

	const getOfficeItemsDetail = catchAsyncRequestHandler(
		async (req, res, next) => {
			const pageable = pageParser(req.query, {
				defaultPage: 1,
				defaultSize: 10
			});

			const [offices, total] =
				await officeItemService.findOfficeItemsDetail(pageable);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				page: pageable.page,
				limit: pageable.size,
				total,
				offices
			});
		}
	);

	const deleteOfficeItemById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			await officeItemService.deleteOfficeItem(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success'
			});
		}
	);

	const updateOfficeItemById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			res.status(HttpStatusCode.OK).json({
				status: 'success'
			});
		}
	);

	return {
		getOfficeItemDetailById,
		getOfficeItemsDetail,
		deleteOfficeItemById,
		updateOfficeItemById
	};
};
