import { DeepPartial, EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
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
}
