import { Pageable } from '@src/components/base/@types/FindAllOptions';

export type MessageFilter = {};

export type MessageSorter = {};

export type MessageQuery = {
	filter?: MessageFilter;
	sorter?: MessageSorter;
	paginate?: Pageable;
};
