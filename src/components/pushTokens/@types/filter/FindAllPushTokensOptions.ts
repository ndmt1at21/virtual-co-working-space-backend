import {
	FilterValue,
	Pageable,
	SortOrder
} from '@src/components/base/@types/FindAllOptions';

export type FindAllPushTokensFilter = {
	userId?: FilterValue;
};

export type FindAllPushTokensSort = {
	expiredAt?: SortOrder;
};

export type FindAllPushTokensOptions = {
	filter?: FindAllPushTokensFilter;
	sort?: FindAllPushTokensSort;
	pageable?: Pageable;
};
