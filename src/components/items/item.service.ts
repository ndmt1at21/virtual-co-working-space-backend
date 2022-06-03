import { PaginationInfo } from '../base/@types/PaginationInfo';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import { ItemDto } from './@types/dto/Item.dto';
import { UpdateItemDto } from './@types/dto/UpdateItem.dto';
import { FindAllItemsOptions } from './@types/filter/FindAllItemsOptions';
import { IItemCreator } from './@types/IItemCreator';
import { IItemService } from './@types/IItemService';
import { IItemValidate } from './@types/IItemValidate';
import { mapItemToItemDto } from './item.mapping';
import { ItemRepository } from './item.repository';

export class ItemService implements IItemService {
	constructor(
		private itemRepository: ItemRepository,
		private itemCreator: IItemCreator,
		private itemValidate: IItemValidate
	) {}

	findAllItems = async (
		options: FindAllItemsOptions
	): Promise<[ItemDto[], PaginationInfo]> => {
		const [items, pagination] = await this.itemRepository.findAllItems(
			options
		);
		const itemsDto = items.map(item => mapItemToItemDto(item));
		return [itemsDto, pagination];
	};

	findItemById = async (id: number): Promise<ItemDto> => {
		await this.itemValidate.checkItemExists(id);
		const itemDto = await this.itemCreator.createItemDetail(id);
		return itemDto;
	};

	createItem = async (dto: CreateItemDto): Promise<ItemDto> => {
		await this.itemValidate.checkItemCategoryExists(dto.categoryId);

		const item = await this.itemRepository.save(dto);
		const itemDto = await this.itemCreator.createItemDetail(item.id);
		return itemDto;
	};

	deleteItemById = async (id: number): Promise<void> => {
		await this.itemValidate.checkItemExists(id);
		await this.itemRepository.softDelete(id);
	};

	updateItemById = async (
		id: number,
		item: UpdateItemDto
	): Promise<ItemDto> => {
		if (item.categoryId) {
			await this.itemValidate.checkItemCategoryExists(item.categoryId);
		}

		await this.itemValidate.checkItemExists(id);
		await this.itemRepository.update(id, item);
		return this.itemCreator.createItemDetail(id);
	};
}
