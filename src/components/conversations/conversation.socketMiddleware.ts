import { IllegalArgumentError, NotFoundError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { ConversationMemberRepository } from '../conversationMembers/conversationMember.repository';
import { ConversationSocket } from './@types/socket/ConversationSocket';
import { IConversationSocketMiddleware } from './@types/socket/IConversationSocketMiddleware';
import { ConversationErrorMessages } from './conversation.error';
import { ConversationRepository } from './conversation.repository';

export class ConversationSocketMiddleware
	implements IConversationSocketMiddleware
{
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly conversationMemberRepository: ConversationMemberRepository
	) {}

	protect = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const conversationId = +context.params.conversationId;

			if (!conversationId) {
				throw new IllegalArgumentError(
					ConversationErrorMessages.INVALID_CONVERSATION_ID
				);
			}

			const { conversation, conversationMember } =
				await this.deserializeConversation(
					conversationId,
					socket.user!.id
				);

			socket.data.conversation = {
				id: conversation.id,
				isOwner: conversation.creatorId === socket.user!.id
			};

			socket.data.conversationMember = {
				id: conversationMember.id,
				conversationId: conversationMember.conversationId,
				memberId: conversationMember.memberId,
				status: conversationMember.status
			};

			next();
		}
	);

	restrictToOwner = catchAsyncSocketHandler(
		async (io, socket: ConversationSocket, context, next) => {
			const isOwner = socket.data.conversation!.isOwner;

			if (!isOwner) {
				throw new NotFoundError(
					ConversationErrorMessages.USER_NOT_FOUND_IN_CONVERSATION
				);
			}

			next();
		}
	);

	async deserializeConversation(conversationId: number, userId: number) {
		const conversation = await this.conversationRepository.findById(
			conversationId
		);

		if (!conversation) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const conversationMember =
			await this.conversationMemberRepository.findConversationMemberByConversationIdAndUserId(
				conversationId,
				userId
			);

		if (!conversationMember) {
			throw new NotFoundError(
				ConversationErrorMessages.USER_NOT_FOUND_IN_CONVERSATION
			);
		}

		return { conversation, conversationMember };
	}
}
