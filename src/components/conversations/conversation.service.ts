import { mapMessageToMessageDto } from '@components/messages/message.mapping';
import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ConversationServiceParams } from './@types/ConversationServiceParams';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';
import { RecentMessagesDto } from './@types/dto/RecentMessages.dto';
import { NotFoundError } from '@src/utils/appError';
import { ConversationErrorMessages } from './conversation.error';
import { mapConversationToConversationOfUserDto } from './conversation.mapping';
import { ConversationOfUserDto } from './@types/dto/ConversationOfUser.dto';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';

export const ConversationService = ({
	conversationMemberRepository,
	conversationRepository,
	messageRepository,
	messageReaderRepository
}: ConversationServiceParams): IConversationService => {
	const findRecentMessagesByConversationIdAndUserId = async (
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto> => {
		const conversation = await conversationRepository.findById(
			conversationId
		);

		if (!conversation) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const [recentMessages, pageInfo] =
			await messageRepository.findRecentMessagesIgnoreSelfDeletedByConversationIdAndUserId(
				conversationId,
				userId,
				pageable
			);

		const messagesDto = recentMessages.map(message =>
			mapMessageToMessageDto(message)
		);

		return {
			messages: messagesDto,
			pagination: pageInfo
		};
	};

	const findConversationOfUserByConversationIdAndUserId = async (
		conversationId: number,
		memberId: number
	): Promise<ConversationOfUserDto> => {
		const conversation =
			await conversationRepository.findConversationByIdWithMembers(
				conversationId
			);

		if (!conversation) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const conversationMember =
			await conversationMemberRepository.findConversationMemberByConversationIdAndUserId(
				conversationId,
				memberId
			);

		if (!conversationMember) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		return mapConversationToConversationOfUserDto(
			conversation,
			conversationMember
		);
	};

	const getConversations = async () => {};

	const markAsReadByConversationIdAndUserId = async (
		conversationId: number,
		userId: number
	): Promise<void> => {
		const conversationMember =
			await conversationMemberRepository.findConversationMemberByConversationIdAndUserId(
				conversationId,
				userId
			);

		if (!conversationMember) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const messageUnreadIds =
			await messageRepository.findRecentMessageIdsByConversationId(
				conversationId,
				conversationMember.lastReadMessageId || 1
			);

		if (messageUnreadIds.length == 0) return;

		messageReaderRepository.manager.transaction(async entityManager => {
			const messageReaders = messageUnreadIds
				.map(message => message.id)
				.map(messageId =>
					messageReaderRepository.create({
						messageId,
						readerId: userId
					})
				);

			await entityManager.save(messageReaders);
			await entityManager.update(
				ConversationMember,
				{ conversationId, userId },
				{
					lastReadMessageId: messageUnreadIds[0].id,
					numberOfUnreadMessages: () =>
						`numberOfUnreadMessages - ${messageUnreadIds.length}`
				}
			);
		});
	};

	return {
		findRecentMessagesByConversationIdAndUserId,
		findConversationOfUserByConversationIdAndUserId,
		markAsReadByConversationIdAndUserId
	};
};
