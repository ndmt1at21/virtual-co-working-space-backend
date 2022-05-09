import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { AccessoryCategoryDetailDto } from './@types/dto/AccessoryCategoryDetail.dto';
import { AccessoryCategoryOverviewDto } from './@types/dto/AccessoryCategoryOverview.dto';
import { AccessoryCategory } from './accessoryCategory.entity';

export const mapAccessoryCategoryToAccessoryCategoryOverviewDto = (
	accessoryCategory: AccessoryCategory
): AccessoryCategoryOverviewDto => {
	const { id, name, description, createdAt } = accessoryCategory;
	return { id, name, description, createdAt };
};

export const mapAccessoryCategoryToAccessoryCategoryDetailDto = (
	accessoryCategory: AccessoryCategory
): AccessoryCategoryDetailDto => {
	const { id, name, description, creator, createdAt } = accessoryCategory;

	const userDto = mapUserToUserOverviewDto(creator);

	return { id, name, description, creator: userDto, createdAt };
};
