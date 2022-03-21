import { NotFoundError } from '@src/utils/appError';
import { IOfficeValidate } from './@types/IOfficeValidate';
import { OfficeErrorMessages } from './office.error';
import { OfficeRepository } from './office.repository';

export const OfficeValidate = (
	officeRepository: OfficeRepository
): IOfficeValidate => {
	const checkOfficeExistsById = async (id: number): Promise<void> => {
		const isExisted = await officeRepository.existsOfficeById(id);

		if (!isExisted)
			throw new NotFoundError(OfficeErrorMessages.OFFICE_NOT_FOUND);
	};

	return { checkOfficeExistsById };
};
