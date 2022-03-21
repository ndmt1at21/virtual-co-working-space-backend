import { ItemDto } from './dto/Item.dto';

export interface IItemCacheService {
	setItem(key: string, value: ItemDto, expireSecond: number): Promise<void>;

	getItem(id: number): Promise<ItemDto | null>;

	invalidateItem(id: number): Promise<number>;
}
