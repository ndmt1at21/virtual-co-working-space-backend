import { Pageable } from '@src/@types/Pageable';
import { OfficeItemDetailDto } from './@types/dto/OfficeItemDetail.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { IOfficeItemValidate } from './@types/IOfficeItemValidate';
import { mapOfficeItemToOfficeItemDetailDto } from './officeItem.mapping';
import { OfficeItemRepository } from './officeItem.repository';

export const OfficeItemService = (
	officeItemRepository: OfficeItemRepository,
	officeItemValidate: IOfficeItemValidate
): IOfficeItemService => {
	const findOfficeItemDetailById = async (
		id: string
	): Promise<OfficeItemDetailDto> => {
		await officeItemValidate.checkOfficeItemExistsById(id);

		const officeItem =
			await officeItemRepository.findOfficeItemWithItemAndOfficeById(id);

		return mapOfficeItemToOfficeItemDetailDto(officeItem!);
	};

	const findOfficeItemsDetail = async (
		pageable: Pageable
	): Promise<[OfficeItemDetailDto[], number]> => {
		const items =
			await officeItemRepository.findOfficeItemsWithItemAndOffice(
				pageable
			);

		const total = await officeItemRepository.count();

		return [
			items.map(item => mapOfficeItemToOfficeItemDetailDto(item)),
			total
		];
	};

	const deleteOfficeItem = async (id: string) => {
		await officeItemValidate.checkOfficeItemExistsById(id);
		await officeItemRepository.delete(id);
	};

	return {
		findOfficeItemDetailById,
		findOfficeItemsDetail,
		deleteOfficeItem
	};
};
