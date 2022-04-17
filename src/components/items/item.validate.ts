import { NotFoundError } from '@src/utils/appError';
import { IItemValidate } from './@types/IItemValidate';
import { ItemErrorMessages } from './item.error';
import { ItemRepository } from './item.repository';

export const ItemValidate = (itemRepository: ItemRepository): IItemValidate => {
	const checkItemExists = async (id: number): Promise<void> => {
		const item = await itemRepository.checkItemExists(id);

		if (!item) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}
	};

	return { checkItemExists };
};
