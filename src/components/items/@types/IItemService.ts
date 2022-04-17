import { CreateItemDto } from './dto/CreateItem.dto';
import { ItemDto } from './dto/Item.dto';
import { FindItemOptions } from './FindAllItemsOptions';

export interface IItemService {
	findAllItems(options: FindItemOptions): Promise<ItemDto[]>;
	findItemById(id: number): Promise<ItemDto>;
	createItem(item: CreateItemDto): Promise<ItemDto>;
	updateItemById(id: number, item: CreateItemDto): Promise<ItemDto>;
	deleteItemById(id: number): Promise<void>;
}
