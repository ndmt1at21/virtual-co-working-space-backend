import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllOfficeMembersFilter = {
	memberId?: FilterValue;
	officeId?: FilterValue;
	onlineStatus?: FilterValue;
	role?: FilterValue;
};

export type FindAllOfficeMembersSort = {
	memberId?: SortOrder;
	officeId?: SortOrder;
	onlineStatus?: SortOrder;
	role?: SortOrder;
	createdAt?: SortOrder;
};

export type FindAllOfficeMembersOptions = {
	filter?: FindAllOfficeMembersFilter;
	sort?: FindAllOfficeMembersSort;
	pageable?: Pageable;
};
