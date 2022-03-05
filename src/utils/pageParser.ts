import { Pageable } from '@src/@types/Pageable';

export type PageParserOptions = {
	defaultPage?: number;
	defaultSize?: number;
};

export const pageParser = (query: any, opts: PageParserOptions): Pageable => {
	const { defaultPage = 1, defaultSize = 10 } = opts;
	const { page, size } = query;

	return {
		page: (page as number) || defaultPage,
		size: (size as number) || defaultSize
	};
};
