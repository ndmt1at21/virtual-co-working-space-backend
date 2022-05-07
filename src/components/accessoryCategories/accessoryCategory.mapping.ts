import { AccessoryCategoryDto } from './@types/dto/AccessoryCategory.dto';
import { AccessoryCategory } from './accessoryCategory.entity';

export const mapAccessoryCategoryToAccessoryCategoryDto = (
	accessoryCategory: AccessoryCategory
): AccessoryCategoryDto => {
	const { id, name, description, createdAt } = accessoryCategory;
	return { id, name, description, createdAt };
};
