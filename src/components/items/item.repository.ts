import { EntityRepository } from 'typeorm';
import { Item } from '@src/components/items/item.entity';
import { BaseRepository } from '../base/BaseRepository';
import { FindItemOptions } from './@types/FindAllItemsOptions';
import { FindAllOptions } from '../base/@types/FindAllOptions';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
	async checkItemExists(id: number): Promise<boolean> {
		const count = await this.createQueryBuilder('item')
			.where('item.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async findAllItems(options: FindItemOptions): Promise<Item[]> {
		const optionsWithDbFields =
			this.mapFindAllItemsOptionsToDatabaseField(options);

		return await this.findAll(optionsWithDbFields);
	}

	mapFindAllItemsOptionsToDatabaseField(
		options: FindItemOptions
	): FindAllOptions {
		const { filter, pageable, sort } = options;

		return {
			filter: {
				name: filter?.name,
				model_path: filter?.path,
				created_at: filter?.createdAt
			},
			sort: {
				name: sort?.name,
				model_path: sort?.path,
				created_at: sort?.createdAt,
				updated_at: sort?.updatedAt
			},
			paginate: pageable
		};
	}
}
