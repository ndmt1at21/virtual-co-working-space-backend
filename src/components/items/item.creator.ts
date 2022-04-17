import { ItemDto } from './@types/dto/Item.dto';
import { IItemCreator } from './@types/IItemCreator';
import { mapItemToItemDto } from './item.mapping';
import { ItemRepository } from './item.repository';

export const ItemCreator = (itemRepository: ItemRepository): IItemCreator => {
	const createItemDetail = async (id: number): Promise<ItemDto> => {
		const item = await itemRepository.findById(id);
		const itemDto = mapItemToItemDto(item!);

		return itemDto;
	};

	return { createItemDetail };
};
