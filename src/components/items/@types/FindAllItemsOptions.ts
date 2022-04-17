import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindItemFilter = {
	name?: FilterValue;
	path?: FilterValue;
	createdAt?: FilterValue;
};

export type FindItemSort = {
	name?: SortOrder;
	path?: SortOrder;
	createdAt?: SortOrder;
	updatedAt?: SortOrder;
};

export type FindItemOptions = {
	filter?: FindItemFilter;
	sort?: FindItemSort;
	pageable?: Pageable;
};
