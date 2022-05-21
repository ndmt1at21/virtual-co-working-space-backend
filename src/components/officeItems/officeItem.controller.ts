import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { OfficeItemTransformDto } from './@types/dto/OfficeItemTransform.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';

export class OfficeItemController {
	constructor(private readonly officeItemService: IOfficeItemService) {}

	createOfficeItem = catchAsyncRequestHandler(async (req, res, next) => {
		const dto = req.body as CreateOfficeItemDto;

		const data = await this.officeItemService.createOfficeItem(dto);

		res.status(HttpStatusCode.OK).json(
			generateResponseData({
				code: HttpStatusCode.CREATED,
				data
			})
		);
	});

	updateTransform = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;
		const dto = req.body as OfficeItemTransformDto;

		const data = await this.officeItemService.updateOfficeItemTransform(
			id,
			dto
		);

		res.status(HttpStatusCode.OK).json(
			generateResponseData({
				code: HttpStatusCode.CREATED,
				data
			})
		);
	});

	getOfficeItemDetailById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const officeItemDto =
				await this.officeItemService.findOfficeItemDetailById(id);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { officeItem: officeItemDto }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	getOfficeItemsDetail = catchAsyncRequestHandler(async (req, res, next) => {
		const { pageable } = PaginateQueryParser.parse(req.query);

		const [officeItems, total] =
			await this.officeItemService.findOfficeItemsDetail(pageable);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { officeItems, total }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	deleteOfficeItemById = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		await this.officeItemService.deleteOfficeItem(id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK
		});
	});
}
