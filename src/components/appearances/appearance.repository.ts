import { EntityRepository } from 'typeorm';
import { FindAllOptions } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { BaseRepository } from '../base/BaseRepository';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAppearancesOptions';
import { Appearance } from './appearance.entity';

@EntityRepository(Appearance)
export class AppearanceRepository extends BaseRepository<Appearance> {
	async findAppearanceByKeysAndUserId(keys: string[], userId: number) {
		return await this.createQueryBuilder('appearance')
			.where('appearance.key IN (:...keys)', { keys })
			.andWhere('appearance.user_id = :userId', { userId })
			.getMany();
	}

	async findAllAccessoriesOfUser(userId: number): Promise<Appearance[]> {
		const appearances = this.createQueryBuilder('appearance')
			.where('appearance.user_id = :userId', { userId })
			.getMany();

		return appearances;
	}

	async findAccessories(
		options: FindAllAccessoriesOptions
	): Promise<[Appearance[], PaginationInfo]> {
		const dbOptions = this.mapFindAllAppearanceOptionsToDatabaseField(
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

		const [appearances, count] = await query.getManyAndCount();

		return [
			appearances,
			{
				page: options.pageable?.page || 1,
				count: appearances.length,
				totalCount: count
			}
		];
	}

	private mapFindAllAppearanceOptionsToDatabaseField(
		alias: string,
		options: FindAllAccessoriesOptions
	): FindAllOptions {
		const { filter, sort, pageable } = options;

		return {
			filter: {
				[`${alias}.user_id`]: filter?.userId
			},
			sort: {
				[`${alias}.key`]: sort?.key,
				[`${alias}.created_at`]: sort?.createdAt
			},
			paginate: pageable
		};
	}
}
