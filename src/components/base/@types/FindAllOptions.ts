export type SortOrder = 'ASC' | 'DESC';

export type FilterOperationKey =
	| 'eq'
	| 'ne'
	| 'lt'
	| 'lte'
	| 'gt'
	| 'gte'
	| 'contains'
	| 'startsWith';

export type FilterValue = {
	[key in FilterOperationKey]?: any;
};

export type Sort = {
	[key: string]: SortOrder | undefined;
};

export type Filter = {
	[key: string]: FilterValue | undefined;
};

export type Pageable = {
	limit?: number;
	page?: number;
};

export type FindAllOptions = {
	sort?: Sort;
	filter?: Filter;
	paginate?: Pageable;
};
