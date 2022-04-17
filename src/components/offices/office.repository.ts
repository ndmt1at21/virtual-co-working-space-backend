import { DeepPartial, EntityRepository } from 'typeorm';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { Office } from './office.entity';
import { OfficeRepositoryQueryBuilder } from './office.repositoryBuilder';

@EntityRepository(Office)
export class OfficeRepository extends BaseRepository<Office> {
	queryBuilder(): OfficeRepositoryQueryBuilder {
		return new OfficeRepositoryQueryBuilder(this);
	}

	async existsOfficeByInvitationCode(
		invitationCode: string
	): Promise<boolean> {
		const count = await this.createQueryBuilder('office')
			.where('office.invitationCode = :invitationCode', {
				invitationCode
			})
			.getCount();

		return count === 1;
	}

	async existsOfficeById(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('office')
			.where('office.id = :id', { id })
			.getCount();

		return count === 1;
	}

	mapFindAllItemsOptionsToDatabaseField(
		options: FindAllOfficesOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				name: filter?.name,
				invitation_code: filter?.invitationCode,
				created_by_user_id: filter?.createdBy,
				office_item: filter?.officeItem,
				office_member: filter?.officeMember,
				created_at: filter?.createdAt
			},
			sort: {
				name: sort?.name,
				invitation_code: sort?.invitationCode,
				created_by_user_id: sort?.createdBy,
				office_item: sort?.officeItem,
				office_member: sort?.officeMember,
				created_at: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
