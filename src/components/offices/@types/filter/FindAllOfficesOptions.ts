import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllOfficesFilter = {
	name?: FilterValue;
	invitationCode?: FilterValue;
	createdBy?: FilterValue;
	createdAt?: FilterValue;
	officeMember?: FilterValue;
	officeItem?: FilterValue;
};

export type FindAllOfficesSort = {
	name?: SortOrder;
	invitationCode?: SortOrder;
	createdBy?: SortOrder;
	createdAt?: SortOrder;
	officeMember?: SortOrder;
	officeItem?: SortOrder;
};

export type FindAllOfficesOptions = {
	filter?: FindAllOfficesFilter;
	sort?: FindAllOfficesSort;
	pageable?: Pageable;
};
