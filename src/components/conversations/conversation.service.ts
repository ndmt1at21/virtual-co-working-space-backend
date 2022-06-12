import { mapMessageToMessageDto } from '@components/messages/message.mapping';
import { RecentMessagePageable } from '../messages/@types/RecentMessagePaginate';
import { IConversationService } from './@types/IConversationService';
import { RecentMessagesDto } from './@types/dto/RecentMessages.dto';
import { NotFoundError } from '@src/utils/appError';
import { ConversationErrorMessages } from './conversation.error';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import {
	mapConversationToConversationDetailDto,
	mapConversationToConversationOverviewDto
} from './conversation.mapping';
import { ConversationOfUserDetailDto } from './@types/dto/ConversationOfUserDetail.dto';
import { ConversationOfUserOverviewDto } from './@types/dto/ConversationOfUserOverview.dto';
import { CreateConversationDto } from './@types/dto/CreateConversation.dto';
import { ConversationOverviewDto } from './@types/dto/ConversationOverview.dto';
import { ConversationType } from './@types/ConversationType';
import { ConversationRepository } from './conversation.repository';
import { ConversationMemberRepository } from '../conversationMembers/conversationMember.repository';
import { MessageRepository } from '../messages/message.repository';
import { UserMessageStatusRepository } from '../messages/components/userMessageStatus/userMessageStatus.repository';
import { ReadConversationDto } from './@types/dto/ReadConversation.dto';
import { UpdateConversationDto } from './@types/dto/UpdateConversation.dto';
import { mapConversationMemberToConversationMemberOverviewDto } from '../conversationMembers/conversationMember.mapping';
import { ConversationMemberOverviewDto } from '../conversationMembers/@types/dto/ConversationMemberOverview.dto';
import { IConversationValidate } from './@types/IConversationValidate';
import { ConversationMemberStatus } from '../conversationMembers/@types/ConversationMemberStatus';

export class ConversationService implements IConversationService {
	constructor(
		private readonly conversationRepository: ConversationRepository,
		private readonly conversationMemberRepository: ConversationMemberRepository,
		private readonly messageRepository: MessageRepository,
		private readonly userMessageStatusRepository: UserMessageStatusRepository,
		private readonly conversationValidate: IConversationValidate
	) {}

	async createConversation(
		createConversationDto: CreateConversationDto
	): Promise<ConversationOfUserDetailDto> {
		const { creatorId, officeId, name, userIds } = createConversationDto;

		const conversation = await this.conversationRepository.save({
			officeId,
			creatorId,
			name,
			type: ConversationType.GROUP_LEVEL,
			conversationMembers: [
				...userIds.map(id => ({ memberId: id })),
				{ memberId: creatorId }
			]
		});

		return await this.findConversationDetailByConversationIdAndUserId(
			conversation.id,
			creatorId
		);
	}

	async updateConversationById(
		id: number,
		updateConversationDto: UpdateConversationDto
	): Promise<ConversationOverviewDto> {
		await this.conversationValidate.checkConversationExists(id);

		const { name } = updateConversationDto;
		const conversation = await this.conversationRepository.findById(id);
		const updatedConversation = await this.conversationRepository.save({
			...conversation!,
			name
		});

		return mapConversationToConversationOverviewDto(updatedConversation);
	}

	async addMembersToConversation(
		id: number,
		memberIds: number[]
	): Promise<ConversationMemberOverviewDto[]> {
		await this.conversationValidate.checkConversationExists(id);

		const [conversationMembers, _] =
			await this.conversationMemberRepository.findConversationMembersByConversationId(
				id
			);

		const newMemberIds = memberIds.filter(
			memberId =>
				!conversationMembers.some(cm => cm.memberId === memberId)
		);

		const newConversationMembers =
			await this.conversationMemberRepository.save(
				newMemberIds.map(memberId => ({
					conversationId: id,
					memberId
				}))
			);

		return newConversationMembers.map(ncm =>
			mapConversationMemberToConversationMemberOverviewDto(ncm)
		);
	}

	async findConversationsOverviewsOfUserInOffice(
		userId: number,
		officeId: number
	): Promise<ConversationOfUserOverviewDto[]> {
		const [conversationMembers, _] =
			await this.conversationMemberRepository.findConversationMembersByUserIdAndOfficeId(
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
	}

	findConversationDetailByConversationIdAndUserId = async (
		conversationId: number,
		memberId: number
	): Promise<ConversationOfUserDetailDto> => {
		await this.conversationValidate.checkConversationExists(conversationId);

		const conversation =
			await this.conversationRepository.findConversationByIdWithMembers(
				conversationId
			);

		const conversationMember =
			await this.conversationMemberRepository.findConversationMemberByConversationIdAndUserId(
				conversationId,
				memberId
			);

		if (!conversationMember) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const conversationDto = mapConversationToConversationDetailDto(
			conversation!
		);

		return {
			conversation: conversationDto,
			unreadMessages: conversationMember.numberOfUnreadMessages,
			joinedAt: conversationMember.createdAt
		};
	};

	findRecentMessagesByConversationIdAndUserId = async (
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<RecentMessagesDto> => {
		await this.conversationValidate.checkConversationExists(conversationId);

		const [recentMessages, pageInfo] =
			await this.messageRepository.findRecentMessagesIgnoreSelfDeletedByConversationIdAndUserId(
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

	markAsReadByConversationIdAndUserId = async (
		conversationId: number,
		userId: number
	): Promise<ReadConversationDto> => {
		await this.conversationValidate.checkConversationExists(conversationId);

		const conversationMember =
			await this.conversationMemberRepository.findConversationMemberByConversationIdAndUserId(
				conversationId,
				userId
			);

		if (!conversationMember) {
			throw new NotFoundError(
				ConversationErrorMessages.CONVERSATION_NOT_FOUND
			);
		}

		const messagesUnreadIds = (
			await this.messageRepository.findRecentMessageIdsByConversationId(
				conversationId,
				conversationMember.numberOfUnreadMessages
			)
		).map(message => message.id);

		if (messagesUnreadIds.length == 0) {
			return {
				conversationId,
				readerId: userId,
				readMessagesId: []
			};
		}

		const messageReaders = messagesUnreadIds.map(messageId =>
			this.userMessageStatusRepository.create({
				messageId,
				userId,
				isRead: true,
				readAt: new Date()
			})
		);

		this.userMessageStatusRepository.manager.transaction(
			async entityManager => {
				await entityManager.save(messageReaders);
				await entityManager.update(
					ConversationMember,
					{ conversationId, memberId: userId },
					{
						numberOfUnreadMessages: () =>
							`number_of_unread_messages - ${messagesUnreadIds.length}`
					}
				);
			}
		);

		return {
			conversationId,
			readerId: userId,
			readMessagesId: messagesUnreadIds
		};
	};

	async findAllMemberIdsByConversationId(
		conversationId: number
	): Promise<number[]> {
		const conversationMembers =
			await this.conversationMemberRepository.findAllMembersByConversationId(
				conversationId
			);

		return conversationMembers.map(cm => cm.memberId);
	}

	async deleteConversationById(id: number): Promise<void> {
		await this.conversationValidate.checkConversationExists(id);
		await this.conversationRepository.softDelete(id);
	}

	async removeConversationMemberById(id: number): Promise<void> {
		const conversationMember =
			await this.conversationMemberRepository.updateConversationMemberStatus(
				id,
				ConversationMemberStatus.BANNED
			);

		if (conversationMember?.affected === 0) {
			throw new NotFoundError(
				ConversationErrorMessages.USER_NOT_FOUND_IN_CONVERSATION
			);
		}
	}
}
