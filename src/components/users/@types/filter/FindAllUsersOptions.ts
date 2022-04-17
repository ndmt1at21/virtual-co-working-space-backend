import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllUsersFilter = {
	name: FilterValue;
	email: FilterValue;
	phone?: FilterValue;
	provider: FilterValue;
	type: FilterValue;
	status: FilterValue;
	blocked: FilterValue;
};

export type FindAllUsersSort = {
	name: SortOrder;
	email: SortOrder;
	phone?: SortOrder;
	provider: SortOrder;
	type: SortOrder;
	status: SortOrder;
	createdAt: SortOrder;
};

export type FindAllUsersOptions = {
	filter?: FindAllUsersFilter;
	sort?: FindAllUsersSort;
	pageable?: Pageable;
};
