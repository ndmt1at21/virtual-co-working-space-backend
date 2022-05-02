import { BaseRepository } from '@src/components/base/BaseRepository';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { EntityRepository } from 'typeorm';
import { MessageReader } from './messageReader.entity';

@EntityRepository(MessageReader)
export class MessageReaderRepository extends BaseRepository<MessageReader> {
	async markAsReadByMessageIds(
		messageIds: number[],
		lastReadMessageId: number,
		conversationId: number,
		readBy: number
	): Promise<void> {
		const messageReaders = messageIds.map(messageId =>
			this.create({ messageId, readerId: readBy })
		);

		this.manager.transaction(async entityManager => {
			await entityManager.save(messageReaders);
			await entityManager.update(
				ConversationMember,
				{ conversationId },
				{
					lastReadMessageId
				}
			);
		});
	}
}
