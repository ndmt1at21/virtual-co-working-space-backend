import { BaseRepository } from '@src/components/base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { AccessoryCategory } from './accessoryCategory.entity';

@EntityRepository(AccessoryCategory)
export class AccessoryCategoryRepository extends BaseRepository<AccessoryCategory> {
	async findAccessoryCategoryById(
		id: number
	): Promise<AccessoryCategory | undefined> {
		const accessoryCategory = await this.createQueryBuilder(
			'accessory_category'
		)
			.where('accessory_category.id = :id', { id })
			.leftJoinAndSelect('accessory_category.creator', 'creator')
			.getOne();

		return accessoryCategory;
	}

	async findAllAccessoryCategories(
		pageable?: Pageable
	): Promise<[AccessoryCategory[], PaginationInfo]> {
		const limit = pageable?.limit || 10;
		const page = pageable?.page || 1;
		const offset = limit * (page - 1) || 0;

		const query = this.createQueryBuilder('accessory_category')
			.leftJoinAndSelect('accessory_category.creator', 'creator')
			.limit(limit)
			.offset(offset)
			.getManyAndCount();

		const [categories, total] = await query;

		return [
			categories,
			{ page, count: categories.length, totalCount: total }
		];
	}
}
