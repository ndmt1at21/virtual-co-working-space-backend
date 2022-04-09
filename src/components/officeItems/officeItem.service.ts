import { Pageable } from '@src/@types/Pageable';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { OfficeItemDetailDto } from './@types/dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './@types/dto/OfficeItemOverviewDto';
import { OfficeItemTransformDto } from './@types/dto/OfficeItemTransform.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { IOfficeItemValidate } from './@types/IOfficeItemValidate';
import {
	mapOfficeItemToOfficeItemDetailDto,
	mapOfficeItemToOfficeItemOverviewDto
} from './officeItem.mapping';
import { OfficeItemRepository } from './officeItem.repository';

export const OfficeItemService = (
	officeItemRepository: OfficeItemRepository,
	officeItemValidate: IOfficeItemValidate
): IOfficeItemService => {
	const createOfficeItem = async (
		createOfficeItemDto: CreateOfficeItemDto
	): Promise<OfficeItemOverviewDto> => {
		const officeItem = await officeItemRepository.save(createOfficeItemDto);
		return mapOfficeItemToOfficeItemOverviewDto(officeItem);
	};

	const updateOfficeItemTransform = async (
		id: number,
		transform: OfficeItemTransformDto
	): Promise<UpdateOfficeItemTransformDto> => {
		await officeItemValidate.checkOfficeItemExistsById(id);
		await officeItemRepository.updateOfficeItemTransformById(id, transform);

		return {
			id,
			transform
		};
	};

	const findOfficeItemDetailById = async (
		id: number
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

	const deleteOfficeItem = async (id: number) => {
		await officeItemValidate.checkOfficeItemExistsById(id);
		await officeItemRepository.delete(id);
	};

	return {
		createOfficeItem,
		updateOfficeItemTransform,
		findOfficeItemDetailById,
		findOfficeItemsDetail,
		deleteOfficeItem
	};
};
