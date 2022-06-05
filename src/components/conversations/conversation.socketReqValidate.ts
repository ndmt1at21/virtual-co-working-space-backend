import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { AddUsersToConversationDto } from './@types/dto/AddUsersToConversation.dto';
import { CreateConversationDto } from './@types/dto/CreateConversation.dto';
import { RemoveUserFromConversationDto } from './@types/dto/RemoveUserFromConversation.dto';
import { UpdateConversationDto } from './@types/dto/UpdateConversation.dto';
import { ConversationSocket } from './@types/socket/ConversationSocket';
import { ConversationErrorMessages } from './conversation.error';

export class ConversationSocketReqValidation {
	constructor() {}

	validateConversationIdParams = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const id = context.params.id;

			if (!id) {
				throw new IllegalArgumentError(
					ConversationErrorMessages.INVALID_CONVERSATION_ID
				);
			}

			next();
		}
	);

	validateCreateConversationData = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const errs = await validateRequestBody(
				CreateConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateUpdateConversationData = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const errs = await validateRequestBody(
				UpdateConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateRemoveUserFromConversationData = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const errs = await validateRequestBody(
				RemoveUserFromConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);

	validateAddMembersToConversationData = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const errs = await validateRequestBody(
				AddUsersToConversationDto,
				context.body
			);

			if (errs.length > 0) throw errs;

			next();
		}
	);
}
