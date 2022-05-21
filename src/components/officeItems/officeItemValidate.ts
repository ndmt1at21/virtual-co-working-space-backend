import { NotFoundError } from '@src/utils/appError';
import { ItemErrorMessages } from '../items/item.error';
import { ItemRepository } from '../items/item.repository';
import { OfficeErrorMessages } from '../offices/office.error';
import { OfficeRepository } from '../offices/office.repository';
import { IOfficeItemValidate } from './@types/IOfficeItemValidate';
import { OfficeItemErrorMessages } from './officeItem.error';
import { OfficeItemRepository } from './officeItem.repository';

export const OfficeItemValidate = (
	officeRepository: OfficeRepository,
	itemRepository: ItemRepository,
	officeItemRepository: OfficeItemRepository
): IOfficeItemValidate => {
	const checkOfficeItemExistsById = async (id: number): Promise<void> => {
		const isExisted = await officeItemRepository.existsOfficeItemById(id);

		if (!isExisted)
			throw new NotFoundError(
				OfficeItemErrorMessages.OFFICE_ITEM_NOT_FOUND
			);
	};

	const checkOfficeAndItemExists = async (
		officeId: number,
		itemId: number
	): Promise<void> => {
		const officeExists = await officeRepository.existsOfficeById(officeId);

		if (!officeExists) {
			throw new NotFoundError(OfficeErrorMessages.OFFICE_NOT_FOUND);
		}

		const itemExisted = await itemRepository.checkItemExists(itemId);

		if (!itemExisted) {
			throw new NotFoundError(ItemErrorMessages.ITEM_NOT_FOUND);
		}
	};

	return { checkOfficeItemExistsById, checkOfficeAndItemExists };
};
