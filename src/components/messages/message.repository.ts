import { DeepPartial, EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { Conversation } from '../conversations/conversation.entity';
import {
	RecentMessagePageable,
	RecentMessagePaginationInfo
} from './@types/RecentMessagePaginate';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {
	async createMessage(entity: DeepPartial<Message>): Promise<Message> {
		const createdMessage = await this.save({
			...entity,
			userMessageStatuses: [
				{
					userId: entity.senderId,
					isRead: true,
					readAt: new Date()
				}
			]
		});

		this.manager.transaction(async entityManager => {
			await entityManager.increment(
				ConversationMember,
				{ conversationId: createdMessage.conversationId! },
				'numberOfUnreadMessages',
				1
			);

			await entityManager.update(
				Conversation,
				{ id: entity.conversationId },
				{ latestMessageId: createdMessage.id }
			);
		});

		return createdMessage;
	}

	async findByMessageIdAndSenderId(
		messageId: number,
		senderId: number
	): Promise<Message | undefined> {
		const message = await this.createQueryBuilder('message')
			.where('message.id = :messageId', {
				messageId
			})
			.andWhere('message.sender_id = :senderId', {
				senderId
			})
			.getOne();

		return message;
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

		console.log(conversationId, userId, limit, nextCursor);

		const query = this.createQueryBuilder('message')
			.leftJoinAndSelect('message.sender', 'user')
			.leftJoinAndSelect(
				'message.userMessageStatuses',
				'user_message_status',
				'user_message_status.user_id = :userId',
				{ userId }
			)
			.where('message.conversation_id = :conversationId', {
				conversationId
			})
			.andWhere(
				'(user_message_status.is_self_deleted = false OR user_message_status.is_self_deleted IS NULL)'
			)
			.addOrderBy('message.createdAt', 'DESC')
			.limit(limit);

		if (nextCursor) {
			query.andWhere('message.id < :messageId', {
				messageId: nextCursor
			});
		}

		const [recentMessages, count] = await query.getManyAndCount();
		const nextCursorResult = count === 0 ? undefined : recentMessages[0].id;

		return [
			recentMessages,
			{
				count,
				nextCursor: nextCursorResult
			}
		];
	}
}
