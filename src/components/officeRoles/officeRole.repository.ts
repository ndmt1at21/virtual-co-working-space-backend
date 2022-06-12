import { EntityRepository, Repository } from 'typeorm';
import { OfficeRole } from '@src/components/officeRoles/officeRole.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(OfficeRole)
export class OfficeRoleRepository extends BaseRepository<OfficeRole> {
	async findOfficeRoleByName(name: string): Promise<OfficeRole | undefined> {
		return await this.createQueryBuilder('office_role')
			.where('office_role.name = :name', { name })
			.getOne();
	}

	async existsById(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('office_role')
			.where('office_role.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async existsByName(name: string): Promise<boolean> {
		const count = await this.createQueryBuilder('office_role')
			.where('office_role.name = :name', { name })
			.getCount();

		return count === 1;
	}
}
