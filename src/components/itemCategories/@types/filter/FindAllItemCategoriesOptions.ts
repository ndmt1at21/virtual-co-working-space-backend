import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllItemCategoriesFilter = {
	name?: FilterValue;
};

export type FindAllItemCategoriesSort = {
	id?: SortOrder;
	createdAt?: SortOrder;
};

export type FindAllItemCategoriesOptions = {
	filter?: FindAllItemCategoriesFilter;
	sort?: FindAllItemCategoriesSort;
	pageable?: Pageable;
};
