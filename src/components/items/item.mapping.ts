import { mapItemCategoryToItemCategoryOverviewDto } from '../itemCategories/itemCategory.mapping';
import { ItemDto } from './@types/dto/Item.dto';
import { Item } from './item.entity';

export const mapItemToItemDto = (item: Item): ItemDto => {
	const { id, modelPath, name, category, image, createdAt } = item;

	const categoryDto = category
		? mapItemCategoryToItemCategoryOverviewDto(category)
		: undefined;

	return { id, modelPath, name, image, category: categoryDto, createdAt };
};
