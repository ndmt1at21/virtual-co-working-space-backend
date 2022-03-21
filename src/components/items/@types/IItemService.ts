import { Pageable } from '@src/@types/Pageable';
import { CreateItemDto } from './dto/CreateItem.dto';
import { ItemDto } from './dto/Item.dto';

export interface IItemService {
	findAll(pageable: Pageable): Promise<ItemDto[]>;
	findById(id: number): Promise<ItemDto>;
	create(item: CreateItemDto): Promise<ItemDto>;
	updateById(id: number, item: CreateItemDto): Promise<ItemDto>;
	deleteById(id: number): Promise<void>;
}
