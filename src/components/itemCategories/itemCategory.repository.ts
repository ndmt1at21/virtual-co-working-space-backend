import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { ItemCategory } from './itemCategory.entity';

@EntityRepository(ItemCategory)
export class ItemCategoryRepository extends BaseRepository<ItemCategory> {
	async findItemCategoryById(id: number): Promise<ItemCategory | undefined> {
		const itemCategory = await this.createQueryBuilder('item_category')
			.where('item_category.id = :id', { id })
			.leftJoinAndSelect('item_category.creator', 'creator')
			.getOne();

		return itemCategory;
	}

	async findAllItemCategories(
		pageable?: Pageable
	): Promise<[ItemCategory[], PaginationInfo]> {
		const limit = pageable?.limit || 10;
		const page = pageable?.page || 1;
		const offset = limit * (page - 1) || 0;

		const query = this.createQueryBuilder('item_category')
			.leftJoinAndSelect('item_category.creator', 'creator')
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
