import { Item } from '../item.entity';
import { ItemDto } from './dto/item.dto';

export interface IItemCreator {
	mapItemToItemDto: (item: Item) => ItemDto;
	mapItemsToItemsDto: (items: Item[]) => ItemDto[];
}
