import { mapAccessoryCategoryToAccessoryCategoryDto } from '../accessoryCategories/accessoryCategory.mapping';
import { AccessoryDto } from './@types/dto/Accessory.dto';
import { Accessory } from './accessory.entity';

export const mapAccessoryToAccessoryDto = (
	accessory: Accessory
): AccessoryDto => {
	const { id, path, category, description, createdAt, updatedAt } = accessory;

	const categoryDto = mapAccessoryCategoryToAccessoryCategoryDto(category);
	return {
		id,
		path,
		description,
		category: categoryDto,
		createdAt,
		updatedAt
	};
};
