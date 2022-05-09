import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';

export type AccessoryCategoryDetailDto = {
	id: number;
	name: string;
	description?: string;
	creator: UserOverviewDto;
	createdAt: Date;
};
