import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { ItemCategoryDetailDto } from './@types/dto/ItemCategoryDetail.dto';
import { ItemCategoryOverviewDto } from './@types/dto/ItemCategoryOverview';
import { ItemCategory } from './itemCategory.entity';

export const mapItemCategoryToItemCategoryOverviewDto = (
	itemCategory: ItemCategory
): ItemCategoryOverviewDto => {
	const { id, name, description, createdAt } = itemCategory;
	return { id, name, description, createdAt };
};

export const mapItemCategoryToItemCategoryDetailDto = (
	itemCategory: ItemCategory
): ItemCategoryDetailDto => {
	const { id, name, description, creator, createdAt } = itemCategory;

	const userDto = mapUserToUserOverviewDto(creator);

	return { id, name, description, creator: userDto, createdAt };
};
