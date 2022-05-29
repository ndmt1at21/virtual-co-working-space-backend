import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { AddUsersToConversationDto } from './@types/dto/AddUsersToConversation.dto';
import { CreateConversationDto } from './@types/dto/CreateConversation.dto';
import { UpdateConversationDto } from './@types/dto/UpdateConversation.dto';

export class ConversationSocketReqValidation {
	constructor() {}

	validateConversationIdParams = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const id = context.params.id;

			if (!id) {
				throw new IllegalArgumentError('Conversation id is required');
			}
		}
	);

	validateCreateConversationData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				CreateConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateUpdateConversationData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				UpdateConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateAddMembersToConversationData = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			const errs = await validateRequestBody(
				AddUsersToConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);
}
