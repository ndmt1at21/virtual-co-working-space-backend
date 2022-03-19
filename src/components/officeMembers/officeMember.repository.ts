import { EntityRepository } from 'typeorm';
import { OfficeMember } from '@src/components/officeMembers/officeMember.entity';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberOnlineStatus } from './@types/OfficeMemberOnlineStatus';
import { OfficeMemberRepositoryQueryBuilder } from './officeMember.repositoryBuilder';

@EntityRepository(OfficeMember)
export class OfficeMemberRepository extends BaseRepository<OfficeMember> {
	queryBuilder(): OfficeMemberRepositoryQueryBuilder {
		return new OfficeMemberRepositoryQueryBuilder(this);
	}

	async existsOfficeMemberById(id: string): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member')
			.where('office_member.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async existsUserInOffice(
		userId: string,
		officeId: string
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member')
			.where('office_member.member_id = :userId', { userId })
			.andWhere('office_member.office_id = :officeId', { officeId })
			.getCount();

		return count === 1;
	}

	async setOfficeMemberOnlineStatusById(
		id: string,
		status: OfficeMemberOnlineStatus
	) {
		await this.createQueryBuilder('office_member')
			.update()
			.where('office_member.id = :id', { id })
			.set({ onlineStatus: status })
			.execute();
	}
}
