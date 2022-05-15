import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { CreateItemDto } from './dto/CreateItem.dto';
import { ItemDto } from './dto/Item.dto';
import { UpdateItemDto } from './dto/UpdateItem.dto';
import { FindAllItemsOptions } from './filter/FindAllItemsOptions';

export interface IItemService {
	findAllItems(
		options: FindAllItemsOptions
	): Promise<[ItemDto[], PaginationInfo]>;

	findItemById(id: number): Promise<ItemDto>;

	createItem(item: CreateItemDto): Promise<ItemDto>;

	updateItemById(id: number, item: UpdateItemDto): Promise<ItemDto>;

	deleteItemById(id: number): Promise<void>;
}
