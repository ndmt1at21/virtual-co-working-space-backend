import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllAppearancesFilter = {
	userId?: FilterValue;
};

export type FindAllAppearancesSort = {
	key?: SortOrder;
	createdAt?: SortOrder;
};

export type FindAllAppearancesOptions = {
	filter?: FindAllAppearancesFilter;
	sort?: FindAllAppearancesSort;
	pageable?: Pageable;
};
