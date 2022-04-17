import { ObjectID, Repository } from 'typeorm';
import { FilterOperationKey, FindAllOptions } from './@types/FindAllOptions';
import { PaginationInfo } from './@types/PaginationInfo';

type ID = string | number | Date | ObjectID;

export abstract class BaseRepository<T> extends Repository<T> {
	findById(id: ID): Promise<T | undefined> {
		return this.findOne(id);
	}

	async findAll(options: FindAllOptions): Promise<[T[], PaginationInfo]> {
		const { filter, sort, paginate } = options;

		const query = this.createQueryBuilder(this.metadata.tableName);

		if (filter) {
			Object.keys(filter).forEach(field => {
				const filterValue = filter[field];

				if (filterValue === undefined) {
					return;
				}

				Object.keys(filterValue).forEach(opt => {
					const operation = opt as FilterOperationKey;
					const value = filterValue[operation];

					switch (operation) {
						case 'eq':
							const eq_value = `${field}_eq_value`;
							query.andWhere(`${field} = :${eq_value}`, {
								[eq_value]: value
							});
							break;
						case 'ne':
							const ne_value = `${field}_ne_value`;
							query.andWhere(`${field} != :${ne_value}`, {
								[ne_value]: value
							});
							break;
						case 'lt':
							const lt_value = `${field}_lt_value`;
							query.andWhere(`${field} < :${lt_value}`, {
								[lt_value]: value
							});
							break;
						case 'lte':
							const lte_value = `${field}_lte_value`;
							query.andWhere(`${field} <= :${lte_value}`, {
								[lte_value]: value
							});
							break;
						case 'gt':
							const gt_value = `${field}_gt_value`;
							query.andWhere(`${field} > :${gt_value}`, {
								[gt_value]: value
							});
							break;
						case 'gte':
							const gte_value = `${field}_gte_value`;
							query.andWhere(`${field} >= :${gte_value}`, {
								[gte_value]: value
							});
							break;
						case 'contains':
							const containsValue = `${field}_contains_value`;
							query.andWhere(`${field} ILIKE :${containsValue}`, {
								[containsValue]: `%${value}%`
							});
							break;
						case 'startsWith':
							const startsWithValue = `${field}_startsWith_value`;
							query.andWhere(
								`${field} ILIKE :${startsWithValue}`,
								{
									[startsWithValue]: `${value}%`
								}
							);
							break;
						default:
							throw new Error(
								`Unknown filter operation: ${operation}`
							);
					}
				});
			});
		}

		if (sort) {
			Object.keys(sort).forEach(field => {
				const order = sort[field];

				if (order === undefined) {
					return;
				}

				query.addOrderBy(field, order);
			});
		}

		if (paginate) {
			const { limit = 100, page = 1 } = paginate;
			query.take(limit).skip((page - 1) * limit);
		}

		const [items, totalCount] = await query.getManyAndCount();

		return [
			items,
			{
				count: items.length,
				page: paginate?.page || 1,
				totalCount
			}
		];
	}
}
