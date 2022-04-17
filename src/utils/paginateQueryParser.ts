import qs from 'qs';

type Filter = {
	[key: string]: { [key in FilterOperationKey]?: any };
};

type Sort = {
	[by: string]: { order: 'ASC' | 'DESC' };
};

type Pageable = {
	limit?: number;
	page?: number;
	nextCursor?: number | string;
};

const filterOperationKeys = [
	'eq',
	'ne',
	'lt',
	'lte',
	'gt',
	'gte',
	'contains',
	'startsWith'
];

type FilterOperationKey =
	| 'eq'
	| 'ne'
	| 'lt'
	| 'lte'
	| 'gt'
	| 'gte'
	| 'contains'
	| 'startsWith';

type DecodedQuery = {
	sort?: Sort;
	pageable?: Pageable;
	filter?: Filter;
};

type PaginateQueryParserConfig = {
	filter?: {
		includes?: string[];
	};

	sortBy?: {
		field?: string;
	};

	page?: {
		limitField?: string;
		pageField?: string;
		nextCursorField?: string;
	};
};

export class PaginateQueryParser {
	static parse(query: any, config?: PaginateQueryParserConfig): DecodedQuery {
		const originalQuery = this.parseOriginalQuery(query);

		const filter = this.filter(originalQuery, config);
		const sort = this.sort(originalQuery, config);
		const pageable = this.paginate(originalQuery, config);

		return {
			filter,
			sort,
			pageable
		};
	}

	private static parseOriginalQuery(query: any) {
		const originalQuery = qs.parse(query, {
			allowDots: false,
			comma: true,
			parseArrays: true,
			strictNullHandling: true,
			decoder(value) {
				if (/^(\d+|\d*\.\d+)$/.test(value)) {
					return parseFloat(value);
				}

				const keywords = {
					true: true,
					false: false,
					null: null,
					undefined: undefined
				};

				if (value in keywords) {
					// @ts-ignore
					return keywords[value];
				}

				return value;
			}
		});

		return originalQuery;
	}

	private static filter(
		originalQuery: { [key: string]: any },
		config?: PaginateQueryParserConfig
	): Filter {
		const includesInFilter = config?.filter?.includes || [];
		const filterObj: Filter = {};

		// just keep the filter field that are in the includes array
		includesInFilter.forEach(field => {
			if (originalQuery[field] !== undefined) {
				filterObj[field] = originalQuery[field];
			}
		});

		// remove not permitted filter operations in each field
		// and convert boolean values to operation equal
		Object.keys(filterObj).forEach(field => {
			const operations = filterObj[field];

			if (typeof operations === 'string') {
				filterObj[field] = { eq: operations };
				return undefined;
			}

			if (typeof operations !== 'object') {
				return undefined;
			}

			Object.keys(operations).forEach(operation => {
				if (!filterOperationKeys.includes(operation)) {
					return undefined;
				}

				const validOperation = operation as FilterOperationKey;
				const value = operations[validOperation];

				if (typeof value === 'boolean') {
					delete filterObj[field][validOperation];

					if (filterObj[field])
						filterObj[field]['eq'] = validOperation;
					else filterObj[field] = { eq: validOperation };
				}

				if (!filterOperationKeys.includes(operation)) {
					delete filterObj[field][validOperation];
					return undefined;
				}
			});
		});

		// Remove empty field that are not has any filter operation
		Object.keys(filterObj).forEach(
			field =>
				Object.keys(filterObj[field]).length === 0 &&
				delete filterObj[field]
		);

		return filterObj;
	}

	private static sort(
		originalQuery: { [key: string]: any },
		config?: PaginateQueryParserConfig
	): Sort {
		const sortByFieldName = config?.sortBy?.field || 'sort_by';
		const originalSorts =
			typeof originalQuery[sortByFieldName] === 'string'
				? [originalQuery[sortByFieldName]]
				: (originalQuery[sortByFieldName] as string[]);

		if (!originalSorts) {
			return {};
		}

		if (originalSorts.length === 0) {
			return {};
		}

		const sort: Sort = {};

		originalSorts
			.filter(field => field.length !== 0)
			.map(field => {
				if (field[0] === '-') {
					const by = field.substring(1);
					sort[by] = {
						order: 'DESC'
					};
				} else {
					sort[field] = {
						order: 'ASC'
					};
				}

				return sort;
			});

		return sort;
	}

	private static paginate(
		originalQuery: { [key: string]: any },
		config?: PaginateQueryParserConfig
	) {
		const limit = +originalQuery[config?.page?.limitField || 'limit'];
		const page = +originalQuery[config?.page?.pageField || 'page'];

		const pageable: Pageable = {
			limit: isNaN(limit) ? undefined : limit,
			page: isNaN(page) ? undefined : page,
			nextCursor:
				originalQuery[config?.page?.nextCursorField || 'next_cursor']
		};

		return pageable;
	}
}
