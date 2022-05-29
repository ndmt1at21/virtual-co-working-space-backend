import { NotFoundError } from '@src/utils/appError';
import { ConversationMemberRepository } from '../conversationMembers/conversationMember.repository';
import { IConversationValidate } from './@types/IConversationValidate';
import { ConversationErrorMessages } from './conversation.error';
import { ConversationRepository } from './conversation.repository';

export class ConversationValidate implements IConversationValidate {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly conversationMemberRepository: ConversationMemberRepository
	) {}

	async checkConversationExists(conversationId: number): Promise<void> {
		const isExists =
			await this.conversationRepository.existsByConversationId(
				conversationId
			);

		if (!isExists) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}
	}

	async checkUserExistsInConversation(
		conversationId: number,
		userId: number
	): Promise<void> {
		const isExists =
			await this.conversationMemberRepository.existsByUserIdAndConversationId(
				userId,
				conversationId
			);

		if (!isExists) {
			throw new NotFoundError(
				ConversationErrorMessages.USER_NOT_FOUND_IN_CONVERSATION
			);
		}
	}

	async checkUserNotExistsInConversation(
		conversationId: number,
		userId: number
	): Promise<void> {
		const isExists =
			await this.conversationMemberRepository.existsByUserIdAndConversationId(
				userId,
				conversationId
			);

		if (isExists) {
			throw new NotFoundError(
				ConversationErrorMessages.USER_ALREADY_IN_CONVERSATION
			);
		}
	}
}
