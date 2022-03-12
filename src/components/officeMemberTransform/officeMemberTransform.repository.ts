import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeMemberTransform } from './officeMemberTransform.entity';

@EntityRepository(OfficeMemberTransform)
export class OfficeMemberTransformRepository extends BaseRepository<OfficeMemberTransform> {
	async findTransformByOfficeMemberId(
		id: string
	): Promise<OfficeMemberTransform | undefined> {
		return this.createQueryBuilder()
			.where('office_member_id = :id', { id })
			.getOne();
	}
}
