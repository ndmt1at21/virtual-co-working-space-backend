import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllItemsFilter = {
	name?: FilterValue;
	path?: FilterValue;
	categoryId?: FilterValue;
	createdAt?: FilterValue;
};

export type FindAllItemsSort = {
	name?: SortOrder;
	path?: SortOrder;
	categoryName?: SortOrder;
	createdAt?: SortOrder;
	updatedAt?: SortOrder;
};

export type FindAllItemsOptions = {
	filter?: FindAllItemsFilter;
	sort?: FindAllItemsSort;
	pageable?: Pageable;
};
