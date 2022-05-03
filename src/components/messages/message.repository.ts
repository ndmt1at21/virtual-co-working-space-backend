import { DeepPartial, EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { Conversation } from '../conversations/conversation.entity';
import {
	RecentMessagePageable,
	RecentMessagePaginationInfo
} from './@types/RecentMessagePaginate';
import { UserMessageStatusType } from './@types/UserMessageStatusType';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {
	async createMessage(entity: DeepPartial<Message>): Promise<Message> {
		let createdMessage: Message;

		const message = this.create({
			...entity,
			userMessageStatuses: [
				{
					userId: entity.senderId,
					status: UserMessageStatusType.READ
				}
			]
		});

		this.manager.transaction(async entityManager => {
			createdMessage = await entityManager.save<Message>(message);

			await entityManager.increment(
				ConversationMember,
				{ conversationId: message.conversationId! },
				'numberOfUnreadMessages',
				1
			);

			await entityManager.update(
				Conversation,
				{ id: entity.conversationId },
				{ latestMessageId: createdMessage.id }
			);
		});

		return createdMessage!;
	}

	async findByMessageIdAndSenderId(
		messageId: number,
		creatorId: number
	): Promise<Message | undefined> {
		return await this.createQueryBuilder('message')
			.where('message.id = :messageId', {
				messageId
			})
			.andWhere('message.sender_id = :senderId', {
				creatorId
			})
			.getOne();
	}

	async findRecentMessageIdsByConversationId(
		conversationId: number,
		count: number
	) {
		return await this.createQueryBuilder('message')
			.select('message.id')
			.where('message.conversation_id = :conversationId', {
				conversationId
			})
			.addOrderBy('message.createdAt', 'DESC')
			.limit(count)
			.getMany();
	}

	async findRecentMessagesIgnoreSelfDeletedByConversationIdAndUserId(
		conversationId: number,
		userId: number,
		pageable: RecentMessagePageable
	): Promise<[Message[], RecentMessagePaginationInfo]> {
		const { limit = 10, nextCursor } = pageable;

		const [recentMessages, count] = await this.createQueryBuilder('message')
			.where('message.conversation_id = :conversationId', {
				conversationId
			})
			.where('message.id < :messageId', {
				nextCursor
			})
			.limit(limit)
			.addOrderBy('message.createdAt', 'DESC')
			.leftJoinAndSelect('message.sender', 'user')
			.leftJoinAndSelect(
				'message.userMessageStatuses',
				'user_message_status',
				'user_message_status.user_id = :userId AND user_message_status.status != :deletedStatus',
				{
					userId,
					deletedStatus: UserMessageStatusType.DELETED
				}
			)
			.getManyAndCount();

		const nextCursorResult =
			count === 0
				? undefined
				: recentMessages[recentMessages.length - 1].id;

		return [
			recentMessages,
			{
				count,
				nextCursor: nextCursorResult
			}
		];
	}
}
