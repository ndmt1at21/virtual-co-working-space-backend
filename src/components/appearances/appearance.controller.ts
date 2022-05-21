import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { CreateAppearancesDto } from './@types/dto/CreateAppearance.dto';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAppearancesOptions';
import { IAppearanceService } from './@types/IAppearanceService';

export class AppearanceController {
	constructor(private appearanceService: IAppearanceService) {}

	createAppearance = catchAsyncRequestHandler(async (req, res, next) => {
		const createAppearanceDto = req.body as CreateAppearancesDto;

		const changedAppearances =
			await this.appearanceService.createAppearance({
				appearances: createAppearanceDto.appearances.map(
					appearance => ({
						...appearance,
						userId: req.user!.id
					})
				),
				userId: req.user!.id
			});

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { appearances: changedAppearances }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAllAccessories = catchAsyncRequestHandler(async (req, res, next) => {
		const options = this.extractQueryFindAllOptions(req.query);

		const [appearances, pagination] =
			await this.appearanceService.findAccessories(options);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { appearances, pagination }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAllAccessoriesOfUser = catchAsyncRequestHandler(
		async (req, res, next) => {
			const appearances =
				await this.appearanceService.findAllAccessoriesOfUser(
					req.user!.id
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { appearances }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	deleteAppearance = catchAsyncRequestHandler(async (req, res, next) => {
		const appearanceId = +req.params.id;

		await this.appearanceService.deleteAppearanceById(appearanceId);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				id: appearanceId
			}
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	private extractQueryFindAllOptions(
		originalQuery: any
	): FindAllAccessoriesOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: {
				includes: ['user_id']
			}
		});

		const options: FindAllAccessoriesOptions = {};

		if (query.filter) {
			const queryFilter = query.filter;

			options.filter = {
				userId: queryFilter?.user_id
			};
		}

		if (query.sort) {
			const querySort = query.sort;

			options.sort = {
				key: querySort?.key.order,
				createdAt: querySort?.created_at.order
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}
}
