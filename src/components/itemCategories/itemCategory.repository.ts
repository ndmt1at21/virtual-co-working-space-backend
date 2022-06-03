import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllOptions, Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { ItemCategory } from './itemCategory.entity';
import { FindAllItemCategoriesOptions } from './@types/filter/FindAllItemCategoriesOptions';

@EntityRepository(ItemCategory)
export class ItemCategoryRepository extends BaseRepository<ItemCategory> {
	async existsById(id: number): Promise<boolean> {
		const itemCategory = await this.createQueryBuilder('item_category')
			.where('item_category.id = :id', { id })
			.getCount();

		return itemCategory === 1;
	}

	async findItemCategoryById(id: number): Promise<ItemCategory | undefined> {
		const itemCategory = await this.createQueryBuilder('item_category')
			.where('item_category.id = :id', { id })
			.leftJoinAndSelect('item_category.creator', 'creator')
			.getOne();

		return itemCategory;
	}

	async findAllItemCategories(
		options: FindAllItemCategoriesOptions
	): Promise<[ItemCategory[], PaginationInfo]> {
		const optionsWithDbFields = this.mapFindAllItemsOptionsToDatabaseField(
			this.metadata.tableName,
			options
		);

		const query = this.createFindAllQueryBuilder(
			this.metadata.tableName,
			optionsWithDbFields
		);

		query.leftJoinAndSelect(`${this.metadata.tableName}.creator`, 'user');

		const [itemCategories, count] = await query.getManyAndCount();

		return [
			itemCategories,
			{
				page: options.pageable?.page || 1,
				count: itemCategories.length,
				totalCount: count
			}
		];
	}

	mapFindAllItemsOptionsToDatabaseField(
		alias: string,
		options: FindAllItemCategoriesOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				[`${alias}.name`]: filter?.name
			},
			sort: {
				[`${alias}.id`]: sort?.id,
				[`${alias}.createdAt`]: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
