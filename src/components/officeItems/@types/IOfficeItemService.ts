import { Pageable } from '@src/@types/Pageable';
import { OfficeItemDetailDto } from './dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './dto/OfficeItemOverviewDto';

export interface IOfficeItemService {
	findOfficeItemDetailById(id: number): Promise<OfficeItemDetailDto>;

	findOfficeItemsDetail(
		pageable: Pageable
	): Promise<[OfficeItemDetailDto[], number]>;

	deleteOfficeItem(id: number): Promise<void>;
}
