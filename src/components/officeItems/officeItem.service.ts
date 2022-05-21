import { Pageable } from '../base/@types/FindAllOptions';
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

export class OfficeItemService implements IOfficeItemService {
	constructor(
		private readonly officeItemRepository: OfficeItemRepository,
		private readonly officeItemValidate: IOfficeItemValidate
	) {}

	createOfficeItem = async (
		createOfficeItemDto: CreateOfficeItemDto
	): Promise<OfficeItemOverviewDto> => {
		await this.officeItemValidate.checkOfficeAndItemExists(
			createOfficeItemDto.officeId,
			createOfficeItemDto.itemId
		);

		const { id } = await this.officeItemRepository.saveOfficeItem(
			createOfficeItemDto
		);

		const createdOfficeItem =
			await this.officeItemRepository.findOfficeItemWithItemById(id);

		return mapOfficeItemToOfficeItemOverviewDto(createdOfficeItem!);
	};

	updateOfficeItemTransform = async (
		id: number,
		transform: OfficeItemTransformDto
	): Promise<UpdateOfficeItemTransformDto> => {
		await this.officeItemValidate.checkOfficeItemExistsById(id);
		await this.officeItemRepository.updateOfficeItemTransformById(
			id,
			transform
		);

		return {
			id,
			transform
		};
	};

	findOfficeItemDetailById = async (
		id: number
	): Promise<OfficeItemDetailDto> => {
		await this.officeItemValidate.checkOfficeItemExistsById(id);

		const officeItem =
			await this.officeItemRepository.findOfficeItemWithItemAndOfficeById(
				id
			);

		return mapOfficeItemToOfficeItemDetailDto(officeItem!);
	};

	findOfficeItemsDetail = async (
		pageable?: Pageable
	): Promise<[OfficeItemDetailDto[], number]> => {
		const items =
			await this.officeItemRepository.findOfficeItemsWithItemAndOffice(
				pageable || { limit: 10, page: 1 }
			);

		const total = await this.officeItemRepository.count();

		return [
			items.map(item => mapOfficeItemToOfficeItemDetailDto(item)),
			total
		];
	};

	deleteOfficeItem = async (id: number) => {
		await this.officeItemValidate.checkOfficeItemExistsById(id);
		await this.officeItemRepository.delete(id);
	};
}
