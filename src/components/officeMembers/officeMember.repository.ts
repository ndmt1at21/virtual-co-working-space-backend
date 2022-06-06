import { DeepPartial, EntityRepository, getManager } from 'typeorm';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberRepositoryQueryBuilder } from './officeMember.repositoryBuilder';
import { Office } from '../offices/office.entity';
import { Conversation } from '../conversations/conversation.entity';
import { ConversationMember } from '../conversationMembers/conversationMember.entity';
import { OfficeMemberStatus } from './@types/OfficeMemberStatus';
import { ConversationMemberStatus } from '../conversationMembers/@types/ConversationMemberStatus';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { Pageable } from '../base/@types/FindAllOptions';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends BaseRepository<OfficeMember> {
	queryBuilder(): OfficeMemberRepositoryQueryBuilder {
		return new OfficeMemberRepositoryQueryBuilder(this);
	}

	async saveOfficeMember(
		entity: DeepPartial<OfficeMember>
	): Promise<OfficeMember> {
		const officeMember = await getManager().transaction(
			async transactionEntityManager => {
				const office = await transactionEntityManager.findOne(
					Office,
					entity.officeId!
				);

				const createdOfficeMember =
					await transactionEntityManager.save<OfficeMember>(
						this.create(entity)
					);

				await transactionEntityManager.increment(
					Office,
					{ id: entity.officeId! },
					'numberOfMembers',
					1
				);

				await transactionEntityManager.save<ConversationMember>(
					transactionEntityManager.create(ConversationMember, {
						conversationId: office?.defaultConversationId,
						memberId: entity.memberId
					})
				);

				return createdOfficeMember;
			}
		);

		return officeMember;
	}

	async findOfficeMembersByMemberId(
		memberId: number,
		pageable?: Pageable
	): Promise<[OfficeMember[], PaginationInfo]> {
		const page = pageable?.page || 1;
		const limit = pageable?.limit || 10;

		const [result, total] = await this.createQueryBuilder('office_member')
			.where(`office_member.member_id = :memberId`, {
				memberId
			})
			.andWhere(`office_member.status = :status`, {
				status: OfficeMemberStatus.ACTIVE
			})
			.take(limit)
			.skip((page - 1) * limit)
			.getManyAndCount();

		return [
			result,
			{ count: result.length, page: page, totalCount: total }
		];
	}

	async removeOfficeMemberById(id: number): Promise<void> {
		await getManager().transaction(async transactionEntityManager => {
			const officeMember = await transactionEntityManager.findOne(
				OfficeMember,
				id
			);

			const office = await transactionEntityManager.findOne(
				Office,
				officeMember!.officeId
			);

			// block office member
			await transactionEntityManager.save(OfficeMember, {
				...officeMember,
				status: OfficeMemberStatus.REMOVED
			});

			// reduce number of members in office
			await transactionEntityManager.decrement(
				Office,
				{ id: office!.id },
				'numberOfMembers',
				1
			);

			// block conversation member
			await transactionEntityManager.update<ConversationMember>(
				ConversationMember,
				{
					conversationId: office!.defaultConversationId,
					memberId: officeMember!.memberId
				},
				{
					status: ConversationMemberStatus.BANNED
				}
			);
		});
	}

	async existsOfficeMemberById(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member')
			.where('office_member.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async existsUserInOffice(
		userId: number,
		officeId: number
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member')
			.where('office_member.member_id = :userId', { userId })
			.andWhere('office_member.office_id = :officeId', { officeId })
			.getCount();

		return count === 1;
	}

	async existsUserEmailInOffice(
		email: string,
		officeId: number
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member')
			.leftJoin('office_member.member', 'user')
			.where('user.email = :email', { email })
			.andWhere('office_member.office_id = :officeId', { officeId })
			.getCount();

		return count === 1;
	}

	async setOfficeMemberOnlineStatusById(
		id: number,
		status: OfficeMemberOnlineStatus
	) {
		await this.createQueryBuilder('office_member')
			.update()
			.where('office_member.id = :id', { id })
			.set({ onlineStatus: status })
			.execute();
	}

	async findOfficeMemberByMemberEmailAndOfficeId(
		email: string,
		officeId: number
	): Promise<OfficeMember | undefined> {
		return this.createQueryBuilder('office_member')
			.where('office_member.office_id = :officeId', { officeId })
			.leftJoin('office_member.member', 'user')
			.where('user.email = :email', { email })
			.getOne();
	}

	async findOfficeMemberByMemberIdAndOfficeId(
		memberId: number,
		officeId: number
	): Promise<OfficeMember | undefined> {
		return this.createQueryBuilder('office_member')
			.where('office_member.office_id = :officeId', { officeId })
			.andWhere('office_member.member_id = :memberId', { memberId })
			.getOne();
	}
}
