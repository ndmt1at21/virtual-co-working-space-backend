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
		return await this.createQueryBuilder('user_message_status')
			.where('user_message_status.message_id = :messageId', { messageId })
			.andWhere('user_message_status.user_id = :userId', {
				userId
			})
			.andWhere('user_message_status.status = :status', { status })
			.getOne();
	}

	async deleteMessageSelfSide(
		messageId: number,
		userId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			userId,
			status: UserMessageStatusType.DELETED
		});
	}

	async addMessageReader(
		messageId: number,
		readerId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			userId: readerId,
			status: UserMessageStatusType.READ
		});
	}

	async addMessageReceiver(
		messageId: number,
		receiverId: number
	): Promise<UserMessageStatus> {
		return await this.save({
			messageId,
			receiverId,
			status: UserMessageStatusType.RECEIVED
		});
	}
}
