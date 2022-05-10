import { NotFoundError } from '@src/utils/appError';
import { IItemValidate } from './@types/IItemValidate';
import { ItemErrorMessages } from './item.error';
import { ItemRepository } from './item.repository';

export class ItemValidate implements IItemValidate {
	constructor(private itemRepository: ItemRepository) {}

	checkItemExists = async (id: number): Promise<void> => {
		const item = await this.itemRepository.checkItemExists(id);

		if (!item) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}
	};
}
