import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllAccessoriesFilter = {
	name?: FilterValue;
	categoryId?: FilterValue;
};

export type FindAllAccessoriesSort = {
	name?: SortOrder;
	categoryName?: SortOrder;
	createdAt?: SortOrder;
};

export type FindAllAccessoriesOptions = {
	filter?: FindAllAccessoriesFilter;
	sort?: FindAllAccessoriesSort;
	pageable?: Pageable;
};
