import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
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
		const { pageable } = PaginateQueryParser.parse(req.query);

		const [officeItems, total] =
			await this.officeItemService.findOfficeItemsDetail(pageable);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { officeItems, total }
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
