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

	async findConversationByOfficeId(
		officeId: number
	): Promise<Conversation[]> {
		return await this.createQueryBuilder('conversation')
			.where('conversation.office_id = :officeId', {
				officeId
			})
			.leftJoinAndSelect(
				'conversation.conversation_members',
				'conversation_member'
			)
			.leftJoinAndSelect('conversation.latest_message', 'message')
			.getMany();
	}

	async findConversationsByUserId(userId: number) {}
}
