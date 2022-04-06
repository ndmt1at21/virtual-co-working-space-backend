import { Pageable } from '@src/@types/Pageable';
import { CreateOfficeItemDto } from './dto/CreateOfficeItem.dto';
import { OfficeItemDetailDto } from './dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './dto/OfficeItemOverviewDto';

export interface IOfficeItemService {
	createOfficeItem(
		createOfficeItemDto: CreateOfficeItemDto
	): Promise<OfficeItemOverviewDto>;

	findOfficeItemDetailById(id: number): Promise<OfficeItemDetailDto>;

	findOfficeItemsDetail(
		pageable: Pageable
	): Promise<[OfficeItemDetailDto[], number]>;

	deleteOfficeItem(id: number): Promise<void>;
}
