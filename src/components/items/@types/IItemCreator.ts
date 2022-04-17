import { ItemDto } from './dto/Item.dto';

export interface IItemCreator {
	createItemDetail: (id: number) => Promise<ItemDto>;
}
