import { NotFoundError } from '@src/utils/appError';
import { ItemCategoryErrorMessages } from '../itemCategories/itemCategory.error';
import { ItemCategoryRepository } from '../itemCategories/itemCategory.repository';
import { IItemValidate } from './@types/IItemValidate';
import { ItemErrorMessages } from './item.error';
import { ItemRepository } from './item.repository';

export class ItemValidate implements IItemValidate {
	constructor(
		private itemRepository: ItemRepository,
		private itemCategoryRepository: ItemCategoryRepository
	) {}

	async checkItemExists(id: number): Promise<void> {
		const item = await this.itemRepository.checkItemExists(id);

		if (!item) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}
	}

	async checkItemCategoryExists(id: number): Promise<void> {
		const exists = await this.itemCategoryRepository.existsById(id);

		if (!exists) {
			throw new NotFoundError(
				ItemCategoryErrorMessages.ITEM_CATEGORY_NOT_FOUND
			);
		}
	}
}
