import { EntityRepository } from 'typeorm';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAccessoriesOptions';
import { Accessory } from './accessory.entity';

@EntityRepository(Accessory)
export class AccessoryRepository extends BaseRepository<Accessory> {
	async findAccessoryById(id: number) {
		return await this.createQueryBuilder('accessory')
			.leftJoinAndSelect('accessory.category', 'category')
			.where('accessory.id = :id', { id })
			.getOne();
	}

	async findAccessories(
		options: FindAllAccessoriesOptions
	): Promise<[Accessory[], PaginationInfo]> {
		const dbOptions = this.mapFindAllAccessoryOptionsToDatabaseField(
			this.metadata.tableName,
			options
		);

		const query = this.createFindAllQueryBuilder(
			this.metadata.tableName,
			dbOptions
		);

		query.leftJoinAndSelect(
			`${this.metadata.tableName}.category`,
			'category'
		);

		const [accessories, count] = await query.getManyAndCount();

		return [
			accessories,
			{
				page: options.pageable?.page || 1,
				count: accessories.length,
				totalCount: count
			}
		];
	}

	private mapFindAllAccessoryOptionsToDatabaseField(
		alias: string,
		options: FindAllAccessoriesOptions
	): FindAllOptions {
		const { filter, sort, pageable } = options;

		return {
			filter: {
				[`${alias}.name`]: filter?.name,
				[`${alias}.category_id`]: filter?.categoryId,
				[`category.name`]: filter?.categoryName
			},
			sort: {
				[`${alias}.name`]: sort?.name,
				[`category.name`]: sort?.categoryName,
				[`${alias}.createdAt`]: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
