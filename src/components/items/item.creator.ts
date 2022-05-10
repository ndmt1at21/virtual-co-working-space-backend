import { ItemDto } from './@types/dto/Item.dto';
import { IItemCreator } from './@types/IItemCreator';
import { mapItemToItemDto } from './item.mapping';
import { ItemRepository } from './item.repository';

export class ItemCreator implements IItemCreator {
	constructor(private itemRepository: ItemRepository) {}

	createItemDetail = async (id: number): Promise<ItemDto> => {
		const item = await this.itemRepository.findItemById(id);
		const itemDto = mapItemToItemDto(item!);
		return itemDto;
	};
}
