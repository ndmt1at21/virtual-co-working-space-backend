import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { OfficeOverviewDto } from '@src/components/offices/@types/dto/OfficeOverview.dto';
import { OfficeItemTransformDto } from './OfficeItemTransform.dto';

export type OfficeItemDetailDto = {
	id: number;
	item: ItemDto;
	office: OfficeOverviewDto;
	transform: OfficeItemTransformDto;
	createdAt: Date;
};
