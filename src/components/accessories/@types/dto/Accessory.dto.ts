import { AccessoryCategoryDto } from '@src/components/accessoryCategories/@types/dto/AccessoryCategory.dto';

export type AccessoryDto = {
	id: number;
	path: string;
	description?: string;
	category: AccessoryCategoryDto;
	createdAt: Date;
	updatedAt: Date;
};
