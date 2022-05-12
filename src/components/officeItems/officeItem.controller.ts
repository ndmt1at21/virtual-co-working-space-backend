import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IOfficeItemService } from './@types/IOfficeItemService';

export class OfficeItemController {
	constructor(private readonly officeItemService: IOfficeItemService) {}

	getOfficeItemDetailById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const officeItemDto =
				await this.officeItemService.findOfficeItemDetailById(id);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { officeItem: officeItemDto }
			});
		}
	);

	getOfficeItemsDetail = catchAsyncRequestHandler(async (req, res, next) => {
		const [offices, total] =
			await this.officeItemService.findOfficeItemsDetail({
				page: 10,
				limit: 10
			});

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { total, offices }
		});
	});

	deleteOfficeItemById = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		await this.officeItemService.deleteOfficeItem(id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK
		});
	});

	updateOfficeItemById = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK
		});
	});
}
