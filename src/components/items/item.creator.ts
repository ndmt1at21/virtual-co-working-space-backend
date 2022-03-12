import { ItemDto } from './@types/dto/Item.dto';
import { IItemCreator } from './@types/IItemCreator';
import { Item } from './item.entity';

export const ItemCreator = (): IItemCreator => {
	const mapItemToItemDto = (item: Item): ItemDto => {
		const { id, name, modelPath, createdAt } = item;
		return {
			id,
			name,
			modelPath,
			createdAt
		};
	};

	const mapItemsToItemsDto = (items: Item[]): ItemDto[] => {
		return items.map(item => mapItemToItemDto(item));
	};

	return { mapItemToItemDto, mapItemsToItemsDto };
};
