import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityType } from './entityType.entity';

@EntityRepository(EntityType)
export class EntityTypeRepository extends BaseRepository<EntityType> {
	async findByNameAndAction(
		name: string,
		action: string
	): Promise<EntityType | undefined> {
		return await this.createQueryBuilder('entity_type')
			.where(
				'entity_type.name = :name AND entity_type.action = :action',
				{ name, action }
			)
			.getOne();
	}
}
