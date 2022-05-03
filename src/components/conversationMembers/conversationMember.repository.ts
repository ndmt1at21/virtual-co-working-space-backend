import { EntityRepository } from 'typeorm';
import { ConversationMember } from '@src/components/conversationMembers/conversationMember.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(ConversationMember)
export class ConversationMemberRepository extends BaseRepository<ConversationMember> {
	async countConversationMemberByConversationId(
		conversationId: number
	): Promise<number> {
		const count = await this.createQueryBuilder('conversation_member')
			.where('conversation_member.conversation_id = :conversationId', {
				conversationId
			})
			.getCount();

		return count;
	}

	async findConversationMembersByUserIdAndOfficeId(
		userId: number,
		officeId: number
	): Promise<[ConversationMember[], number]> {
		const [conversationMembers, count] = await this.createQueryBuilder(
			'conversation_member'
		)
			.where('conversation_member.user_id = :userId', {
				userId
			})
			.leftJoinAndSelect('conversation_member.member', 'user')
			.leftJoinAndSelect(
				'conversation_member.conversation',
				'conversation',
				'conversation.office_id = :officeId',
				{ officeId }
			)
			.leftJoinAndSelect('conversation.latestMessage', 'message')
			.getManyAndCount();

		return [conversationMembers, count];
	}

	async findConversationMembersByConversationId(
		conversationId: number
	): Promise<[ConversationMember[], number]> {
		const [conversationMembers, count] = await this.createQueryBuilder(
			'conversation_member'
		)
			.where('conversation_member.conversation_id = :conversationId', {
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
