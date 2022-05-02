import { EntityRepository } from 'typeorm';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends BaseRepository<ConversationMember> {
	async findConversationMembersByConversationId(
		conversationId: number
	): Promise<[ConversationMember[], number]> {
		const [conversationMembers, count] = await this.createQueryBuilder(
			'conversation_member'
		)
			.where('conversation_member.conversation_id = :conversation_id', {
				conversationId
			})
			.leftJoinAndSelect('conversation_member.member', 'user')
			.getManyAndCount();

		return [conversationMembers, count];
	}

	async findConversationMemberByConversationIdAndUserId(
		conversationId: number,
		userId: number
	): Promise<ConversationMember | undefined> {
		const conversationMember = await this.createQueryBuilder(
			'conversation_member'
		)
			.where('conversation_member.conversation_id = :conversationId', {
				conversationId
			})
			.andWhere('conversation_member.member_id = :userId', {
				userId
			})
			.getOne();

		return conversationMember;
	}
}
