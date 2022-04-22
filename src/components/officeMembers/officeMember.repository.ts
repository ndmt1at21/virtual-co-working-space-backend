import { DeepPartial, EntityRepository, getManager } from 'typeorm';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberRepositoryQueryBuilder } from './officeMember.repositoryBuilder';
import { Office } from '../offices/office.entity';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends BaseRepository<OfficeMember> {
	queryBuilder(): OfficeMemberRepositoryQueryBuilder {
		return new OfficeMemberRepositoryQueryBuilder(this);
	}

	async saveOfficeMember(
		entity: DeepPartial<OfficeMember>
	): Promise<OfficeMember> {
		let createdOfficeMember: OfficeMember;

		getManager().transaction(async transactionEntityManager => {
			const officeMember = this.create(entity);

			createdOfficeMember =
				await transactionEntityManager.save<OfficeMember>(officeMember);

			const updateResult = await transactionEntityManager.increment(
				Office,
				{ id: entity.officeId! },
				'numberOfMembers',
				1
			);

			console.log(updateResult);
		});

		// TODO: can throw an error ?
		return createdOfficeMember!;
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
