import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllUserOfficesFilter = {
	name?: FilterValue;
	owner?: FilterValue;
};

export type FindAllUserOfficesSort = {
	createdAt?: SortOrder;
};

export type FindAllUserOfficesOptions = {
	filter?: FindAllUserOfficesFilter;
	sort?: FindAllUserOfficesSort;
	pageable?: Pageable;
};
