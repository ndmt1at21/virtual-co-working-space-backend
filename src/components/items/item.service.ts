import { Pageable } from '@src/@types/Pageable';
import { NotFoundError } from '@src/utils/appError';
import { CreateItemDto } from './@types/dto/CreateItem.dto';
import { ItemDto } from './@types/dto/Item.dto';
import { UpdateItemDto } from './@types/dto/UpdateItem.dto';
import { IItemCreator } from './@types/IItemCreator';
import { IItemService } from './@types/IItemService';
import { ItemErrorMessages } from './item.error';
import { ItemRepository } from './item.repository';

export const ItemService = (
	itemRepository: ItemRepository,
	itemCreator: IItemCreator
): IItemService => {
	const findAll = async ({ page, size }: Pageable): Promise<ItemDto[]> => {
		const items = await itemRepository
			.createQueryBuilder()
			.take(size)
			.skip((page - 1) * size)
			.getMany();

		return itemCreator.mapItemsToItemsDto(items);
	};

	const findById = async (id: number): Promise<ItemDto> => {
		const item = await itemRepository.findOne(id);

		if (!item) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}

		return itemCreator.mapItemToItemDto(item);
	};

	const create = async (dto: CreateItemDto): Promise<ItemDto> => {
		const item = await itemRepository.save(dto);
		return itemCreator.mapItemToItemDto(item);
	};

	const deleteById = async (id: number): Promise<void> => {
		const result = await itemRepository.softDelete(id);

		if (!result.affected) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}
	};

	const updateById = async (
		id: number,
		item: UpdateItemDto
	): Promise<ItemDto> => {
		const updatedItem = await itemRepository.save({ id, ...item });

		if (!updatedItem) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}

		return itemCreator.mapItemToItemDto(updatedItem);
	};

	return { findAll, findById, create, deleteById, updateById };
};
