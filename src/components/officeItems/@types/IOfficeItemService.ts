import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { CreateOfficeItemDto } from './dto/CreateOfficeItem.dto';
import { OfficeItemDetailDto } from './dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './dto/OfficeItemOverviewDto';
import { OfficeItemTransformDto } from './dto/OfficeItemTransform.dto';
import { UpdateOfficeItemTransformDto } from './dto/UpdateOfficeItemTransform.dto';

export interface IOfficeItemService {
	createOfficeItem(
		createOfficeItemDto: CreateOfficeItemDto
	): Promise<OfficeItemOverviewDto>;

	updateOfficeItemTransform(
		id: number,
		transform: OfficeItemTransformDto
	): Promise<UpdateOfficeItemTransformDto>;

	findOfficeItemDetailById(id: number): Promise<OfficeItemDetailDto>;

	findOfficeItemsDetail(
		pageable?: Pageable
	): Promise<[OfficeItemDetailDto[], number]>;

	deleteOfficeItem(id: number): Promise<void>;
}
