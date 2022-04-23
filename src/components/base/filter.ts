import { SelectQueryBuilder } from 'typeorm';
import { FilterOperationKey, FilterValue } from './@types/FindAllOptions';
import { BaseEntity } from './BaseEntity';

export const addFilterToQuery = <T extends BaseEntity>(
	query: SelectQueryBuilder<T>,
	filter: {
		field: string;
		value: FilterValue;
	}
) => {
	const { field, value } = filter;

	Object.keys(value).forEach(opt => {
		const operation = opt as FilterOperationKey;
		const operationValue = filter.value[operation];

		switch (operation) {
			case 'eq':
				const eq_value = `${field}_eq_value`;
				query.andWhere(`${field} = :${eq_value}`, {
					[eq_value]: operationValue
				});
				break;
			case 'ne':
				const ne_value = `${field}_ne_value`;
				query.andWhere(`${field} != :${ne_value}`, {
					[ne_value]: operationValue
				});
				break;
			case 'lt':
				const lt_value = `${field}_lt_value`;
				query.andWhere(`${field} < :${lt_value}`, {
					[lt_value]: operationValue
				});
				break;
			case 'lte':
				const lte_value = `${field}_lte_value`;
				query.andWhere(`${field} <= :${lte_value}`, {
					[lte_value]: operationValue
				});
				break;
			case 'gt':
				const gt_value = `${field}_gt_value`;
				query.andWhere(`${field} > :${gt_value}`, {
					[gt_value]: operationValue
				});
				break;
			case 'gte':
				const gte_value = `${field}_gte_value`;
				query.andWhere(`${field} >= :${gte_value}`, {
					[gte_value]: operationValue
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
				query.andWhere(`${field} ILIKE :${startsWithValue}`, {
					[startsWithValue]: `${value}%`
				});
				break;
			case 'in':
				const in_value = `${field}_in_value`;
				query.andWhere(`${field} IN (:${in_value})`, {
					[in_value]: operationValue
				});
				break;
			default:
				throw new Error(`Unknown filter operation: ${operation}`);
		}
	});
};

export const addSortToQuery = <T extends BaseEntity>(
	query: SelectQueryBuilder<T>,
	sort: {
		field: string;
		order: 'ASC' | 'DESC';
	}
) => {
	const { field, order } = sort;
	query.orderBy(field, order);
};
