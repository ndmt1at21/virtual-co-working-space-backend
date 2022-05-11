import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllAccessoriesFilter = {
	userId?: FilterValue;
};

export type FindAllAccessoriesSort = {
	key?: SortOrder;
	createdAt?: SortOrder;
};

export type FindAllAccessoriesOptions = {
	filter?: FindAllAccessoriesFilter;
	sort?: FindAllAccessoriesSort;
	pageable?: Pageable;
};
