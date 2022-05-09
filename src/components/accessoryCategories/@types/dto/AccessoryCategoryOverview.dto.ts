import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type AccessoryCategoryOverviewDto = {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
};
