import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import {
	RecentMessagePageable,
	RecentMessagePaginationInfo
} from './@types/RecentMessagePaginate';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {
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
		fromMessageId: number
	) {
		return await this.createQueryBuilder('message')
			.select('message.id')
			.where('message.conversation_id = :conversationId', {
				conversationId
			})
			.andWhere('message.id > :messageId', { messageId: fromMessageId })
			.addOrderBy('message.createdAt', 'DESC')
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
			.leftJoinAndSelect('message.readers', 'message_reader')
			.leftJoinAndSelect(
				'message.deletedMessageOfUsers',
				'user_deleted_message',
				'user_deleted_message.user_id != :userId',
				{ userId }
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
