import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberRole } from './officeMemberRole.entity';

@EntityRepository(OfficeMemberRole)
export class OfficeMemberRoleRepository extends BaseRepository<OfficeMemberRole> {
	async findByOfficeMemberIdAndOfficeRoleId(
		officeMemberId: number,
		officeRoleId: number
	): Promise<OfficeMemberRole | undefined> {
		return await this.createQueryBuilder('office_member_role')
			.leftJoinAndSelect('office_member_role.officeRole', 'office_role')
			.where('office_member_role.office_member_id = :officeMemberId', {
				officeMemberId
			})
			.andWhere('office_member_role.office_role_id = :officeRoleId', {
				officeRoleId
			})
			.getOne();
	}

	async existsByOfficeMemberIdAndOfficeRoleId(
		officeMemberId: number,
		officeRoleId: number
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office_member_role')
			.where('office_member_role.office_member_id = :officeMemberId', {
				officeMemberId
			})
			.andWhere('office_member_role.office_role_id = :officeRoleId', {
				officeRoleId
			})
			.getCount();

		return count === 1;
	}

	async saveOfficeMemberRole(
		officeMemberId: number,
		officeRoleId: number
	): Promise<OfficeMemberRole> {
		return await this.save({
			officeMemberId,
			officeRoleId
		});
	}
}
