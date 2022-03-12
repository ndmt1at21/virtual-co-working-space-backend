import { Pageable } from '@src/@types/Pageable';
import { CreateItemDto } from './dto/CreateItem.dto';
import { ItemDto } from './dto/Item.dto';

export interface IItemService {
	findAll(pageable: Pageable): Promise<ItemDto[]>;
	findById(id: string): Promise<ItemDto>;
	create(item: CreateItemDto): Promise<ItemDto>;
	updateById(id: string, item: CreateItemDto): Promise<ItemDto>;
	deleteById(id: string): Promise<void>;
}
