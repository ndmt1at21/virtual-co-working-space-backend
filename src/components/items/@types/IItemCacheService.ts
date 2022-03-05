import { ItemDto } from './dto/item.dto';

export interface IItemCacheService {
	setItem(key: string, value: ItemDto, expireSecond: number): Promise<void>;

	getItem(id: string): Promise<ItemDto | null>;

	invalidateItem(id: string): Promise<number>;
}
