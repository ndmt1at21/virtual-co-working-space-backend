import { NotFoundError } from '@src/utils/appError';
import { IOfficeItemValidate } from './@types/IOfficeItemValidate';
import { OfficeItemErrorMessages } from './officeItem.error';
import { OfficeItemRepository } from './officeItem.repository';

export const OfficeItemValidate = (
	officeItemRepository: OfficeItemRepository
): IOfficeItemValidate => {
	const checkOfficeItemExistsById = async (id: number): Promise<void> => {
		const isExisted = await officeItemRepository.existsOfficeItemById(id);

		if (!isExisted)
			throw new NotFoundError(
				OfficeItemErrorMessages.OFFICE_ITEM_NOT_FOUND
			);
	};

	return { checkOfficeItemExistsById };
};
