import { AccessoryCategoryOverviewDto } from '@src/components/accessoryCategories/@types/dto/AccessoryCategoryOverview.dto';

export type AccessoryDto = {
	id: number;
	path: string;
	description?: string;
	category: AccessoryCategoryOverviewDto;
	createdAt: Date;
	updatedAt: Date;
};
