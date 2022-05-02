import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { UserMessageStatusType } from '../../@types/UserMessageStatusType';
import { UserMessageStatus } from './userMessageStatus.entity';

@EntityRepository(UserMessageStatus)
export class UserMessageStatusRepository extends BaseRepository<UserMessageStatus> {
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
