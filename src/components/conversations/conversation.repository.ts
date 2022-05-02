import { EntityRepository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { BaseRepository } from '../base/BaseRepository';

@EntityRepository(Conversation)
export class ConversationRepository extends BaseRepository<Conversation> {
	async findConversationByIdWithMembers(
		id: number
	): Promise<Conversation | undefined> {
		return await this.createQueryBuilder('conversation')
			.where('conversation.id = :id', {
				id
			})
			.leftJoinAndSelect('conversation.members', 'user')
			.getOne();
	}
}
