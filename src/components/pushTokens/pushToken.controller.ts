import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { CreatePushTokenDto } from './@types/dto/CreatePushToken.dto';
import { FindAllPushTokensOptions } from './@types/filter/FindAllPushTokensOptions';
import { IPushTokenService } from './@types/IPushTokenService';

export class PushTokenController {
	constructor(private readonly pushTokenService: IPushTokenService) {}

	registerPushToken = catchAsyncRequestHandler(async (req, res, next) => {
		const createPushTokenDto = req.body as CreatePushTokenDto;

		const pushTokenDto =
			await this.pushTokenService.createOrUpdatePushToken({
				...createPushTokenDto,
				userId: req.user!.id,
				device: req.body.device
			});

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { pushToken: pushTokenDto.pushToken }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	getPushTokens = catchAsyncRequestHandler(async (req, res, next) => {
		const queryOptions = this.extractQueryFindAllOptions(req.query);

		const [pushTokens, pageInfo] =
			await this.pushTokenService.findAllPushTokens(queryOptions);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { pushTokens, pagination: pageInfo }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	extractQueryFindAllOptions(originalQuery: any): FindAllPushTokensOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: {
				includes: ['user_id']
			}
		});

		const options: FindAllPushTokensOptions = {};

		if (query.filter) {
			const queryFilter = query.filter;

			options.filter = {
				userId: queryFilter.user_id
			};
		}

		if (query.sort) {
			const querySort = query.sort;

			options.sort = {
				expiredAt: querySort.expired_at?.order
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}
}
