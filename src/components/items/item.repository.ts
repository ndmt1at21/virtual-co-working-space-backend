import { EntityRepository } from 'typeorm';
import { Item } from '@src/components/items/item.entity';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllItemsOptions } from './@types/filter/FindAllItemsOptions';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
	async checkItemExists(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('item')
			.where('item.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async findItemById(id: number): Promise<Item | undefined> {
		const item = this.createQueryBuilder('item')
			.where('item.id = :id', {
				id
			})
			.leftJoinAndSelect('item.category', 'category')
			.getOne();

		return item;
	}

	async findAllItems(
		options: FindAllItemsOptions
	): Promise<[Item[], PaginationInfo]> {
		const optionsWithDbFields = this.mapFindAllItemsOptionsToDatabaseField(
			this.metadata.tableName,
			options
		);

		const query = this.createFindAllQueryBuilder(
			this.metadata.tableName,
			optionsWithDbFields
		);

		query.leftJoinAndSelect(
			`${this.metadata.tableName}.category`,
			'category'
		);

		const [items, count] = await query.getManyAndCount();

		return [
			items,
			{
				page: options.pageable?.page || 1,
				count: items.length,
				totalCount: count
			}
		];
	}

	mapFindAllItemsOptionsToDatabaseField(
		alias: string,
		options: FindAllItemsOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				[`${alias}.name`]: filter?.name,
				[`${alias}.model_path`]: filter?.path,
				[`${alias}.created_at`]: filter?.createdAt,
				[`${alias}.category_id`]: filter?.categoryId
			},
			sort: {
				[`${alias}.name`]: sort?.name,
				[`${alias}.modelPath`]: sort?.path,
				[`category.name`]: sort?.categoryName,
				[`${alias}.createdAt`]: sort?.createdAt,
				[`${alias}.updatedAt`]: sort?.updatedAt
			},
			paginate: pageable
		};
	}
}
