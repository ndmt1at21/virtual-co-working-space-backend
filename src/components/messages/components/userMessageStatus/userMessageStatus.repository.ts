import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { UserMessageStatusType } from '../../@types/UserMessageStatusType';
import { UserMessageStatus } from './userMessageStatus.entity';

@EntityRepository(UserMessageStatus)
export class UserMessageStatusRepository extends BaseRepository<UserMessageStatus> {
	async findByMessageIdAndUserIdAndStatus(
		messageId: number,
		userId: number,
		status: UserMessageStatusType
	): Promise<UserMessageStatus | undefined> {
		const query = this.createQueryBuilder('user_message_status')
			.where('user_message_status.message_id = :messageId', { messageId })
			.andWhere('user_message_status.user_id = :userId', {
				userId
			});

		if (status === UserMessageStatusType.DELETED) {
			query.andWhere(
				'user_message_status.is_self_deleted = :isSelfDeleted',
				{ isSelfDeleted: true }
			);
		}

		if (status === UserMessageStatusType.RECEIVED) {
			query.andWhere(
				'user_message_status.is_self_deleted = :isReceived',
				{ isReceived: true }
			);
		}

		if (status === UserMessageStatusType.READ) {
			query.andWhere(
				'user_message_status.is_self_deleted = :isReceived',
				{ isRead: true }
			);
		}

		return await query.getOne();
	}

	async deleteMessageSelfSide(
		messageId: number,
		userId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			userId,
			isSelfDeleted: true,
			selfDeletedAt: new Date()
		});
	}

	async addMessageReader(
		messageId: number,
		readerId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			userId: readerId,
			isRead: true,
			readAt: new Date()
		});
	}

	async addMessageReceiver(
		messageId: number,
		receiverId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			receiverId,
			isReceived: true,
			receivedAt: new Date()
		});
	}
}
