import { ItemCategoryOverviewDto } from '@src/components/itemCategories/@types/dto/ItemCategoryOverview';

export type ItemDto = {
	id: number;
	name: string;
	modelPath: string;
	image?: string;
	category: ItemCategoryOverviewDto;
	createdAt: Date;
};

export type ItemOverviewDto = {
	id: number;
	name: string;
	modelPath: string;
	image?: string;
	createdAt: Date;
};
