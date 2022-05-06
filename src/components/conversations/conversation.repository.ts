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
			.leftJoinAndSelect('conversation.creator', 'user1')
			.leftJoinAndSelect(
				'conversation.conversationMembers',
				'conversation_member'
			)
			.leftJoinAndSelect('conversation_member.member', 'user2')
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
				'conversation.conversationMembers',
				'conversation_member'
			)
			.leftJoinAndSelect('conversation.latestMessage', 'message')
			.getMany();
	}

	async findConversationsByUserId(userId: number) {}
}
