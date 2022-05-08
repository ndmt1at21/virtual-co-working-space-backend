import { mapMessageToMessageDto } from '@components/messages/message.mapping';
import { ConversationServiceParams } from './@types/ConversationServiceParams';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';
import { RecentMessagesDto } from './@types/dto/RecentMessages.dto';
import { NotFoundError } from '@src/utils/appError';
import { ConversationErrorMessages } from './conversation.error';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { UserMessageStatusType } from '../messages/@types/UserMessageStatusType';
import { ConversationDetailDto } from './@types/dto/ConversationDetail.dto';
import {
	mapConversationToConversationDetailDto,
	mapConversationToConversationOverviewDto
} from './conversation.mapping';
import { ConversationOfUserDetailDto } from './@types/dto/ConversationOfUserDetail.dto';
import { ConversationOfUserOverviewDto } from './@types/dto/ConversationOfUserOverview.dto';
import { CreateConversationDto } from './@types/dto/CreateConversation.dto';
import { ConversationOverviewDto } from './@types/dto/ConversationOverview.dto';
import { ConversationType } from './@types/ConversationType';

export const ConversationService = ({
	conversationMemberRepository,
	conversationRepository,
	messageRepository,
	userMessageStatusRepository
}: ConversationServiceParams): IConversationService => {
	const createConversation = async (
		createConversationDto: CreateConversationDto
	): Promise<ConversationOverviewDto> => {
		const { creatorId, officeId } = createConversationDto;

		const conversation = await conversationRepository.save({
			officeId,
			creatorId,
			type: ConversationType.GROUP_LEVEL,
			conversationMembers: [{ memberId: creatorId }]
		});

		return mapConversationToConversationOverviewDto(conversation);
	};

	const findConversationsOverviewsOfUserInOffice = async (
		userId: number,
		officeId: number
	): Promise<ConversationOfUserOverviewDto[]> => {
		const [conversationMembers, _] =
			await conversationMemberRepository.findConversationMembersByUserIdAndOfficeId(
				userId,
				officeId
			);

		return conversationMembers.map(cm => {
			const conversationDto = mapConversationToConversationOverviewDto(
				cm.conversation
			);

			return {
				conversation: conversationDto,
				unreadMessages: cm.numberOfUnreadMessages,
				joinedAt: cm.createdAt
			};
		});
	};

	const findConversationDetailByConversationIdAndUserId = async (
		conversationId: number,
		memberId: number
	): Promise<ConversationOfUserDetailDto> => {
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

		const conversationDto =
			mapConversationToConversationDetailDto(conversation);

		return {
			conversation: conversationDto,
			unreadMessages: conversationMember.numberOfUnreadMessages,
			joinedAt: conversationMember.createdAt
		};
	};

	const findRecentMessagesByConversationIdAndUserId = async (
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto> => {
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

		const messagesUnreadIds = (
			await messageRepository.findRecentMessageIdsByConversationId(
				conversationId,
				conversationMember.numberOfUnreadMessages
			)
		).map(message => message.id);

		if (messagesUnreadIds.length == 0) return;

		const messageReaders = messagesUnreadIds.map(messageId =>
			userMessageStatusRepository.create({
				messageId,
				userId,
				isRead: true,
				readAt: new Date()
			})
		);

		userMessageStatusRepository.manager.transaction(async entityManager => {
			await entityManager.save(messageReaders);
			await entityManager.update(
				ConversationMember,
				{ conversationId, memberId: userId },
				{
					numberOfUnreadMessages: () =>
						`number_of_unread_messages - ${messagesUnreadIds.length}`
				}
			);
		});
	};

	return {
		createConversation,
		findRecentMessagesByConversationIdAndUserId,
		findConversationsOverviewsOfUserInOffice,
		findConversationDetailByConversationIdAndUserId,
		markAsReadByConversationIdAndUserId
	};
};
