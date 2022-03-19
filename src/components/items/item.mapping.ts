import { ItemDto } from './@types/dto/Item.dto';
import { Item } from './item.entity';

export const mapItemToItemDto = (item: Item): ItemDto => {
	const { id, modelPath, name, createdAt } = item;
	return { id, modelPath, name, createdAt };
};
