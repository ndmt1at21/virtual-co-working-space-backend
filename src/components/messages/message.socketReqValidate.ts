import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateMessageDto } from './@types/dto/CreateMessage.dto';
import { RevokeMessageData } from './@types/dto/RevokeMessageData.dto';

export class MessageSocketReqValidation {
	constructor() {}

	validateCreateMessageData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				CreateMessageDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateRevokeMessageData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				RevokeMessageData,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);
}
