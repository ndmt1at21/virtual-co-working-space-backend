import { CreateItemDto } from './@types/dto/CreateItem.dto';
import { ItemDto } from './@types/dto/Item.dto';
import { UpdateItemDto } from './@types/dto/UpdateItem.dto';
import { FindItemOptions } from './@types/FindAllItemsOptions';
import { IItemCreator } from './@types/IItemCreator';
import { IItemService } from './@types/IItemService';
import { IItemValidate } from './@types/IItemValidate';
import { mapItemToItemDto } from './item.mapping';
import { ItemRepository } from './item.repository';

export const ItemService = (
	itemRepository: ItemRepository,
	itemCreator: IItemCreator,
	itemValidate: IItemValidate
): IItemService => {
	const findAllItems = async (
		options: FindItemOptions
	): Promise<ItemDto[]> => {
		const items = await itemRepository.findAllItems(options);
		const itemsDto = items.map(item => mapItemToItemDto(item));
		return itemsDto;
	};

	const findItemById = async (id: number): Promise<ItemDto> => {
		await itemValidate.checkItemExists(id);
		const itemDto = await itemCreator.createItemDetail(id);
		return itemDto;
	};

	const createItem = async (dto: CreateItemDto): Promise<ItemDto> => {
		const item = await itemRepository.save(dto);
		const itemDto = await itemCreator.createItemDetail(item.id);
		return itemDto;
	};

	const deleteItemById = async (id: number): Promise<void> => {
		await itemValidate.checkItemExists(id);
		await itemRepository.softDelete(id);
	};

	const updateItemById = async (
		id: number,
		item: UpdateItemDto
	): Promise<ItemDto> => {
		await itemValidate.checkItemExists(id);
		await itemRepository.update(id, item);
		return itemCreator.createItemDetail(id);
	};

	return {
		findAllItems,
		findItemById,
		createItem,
		deleteItemById,
		updateItemById
	};
};
