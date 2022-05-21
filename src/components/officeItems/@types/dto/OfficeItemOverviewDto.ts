import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { OfficeItemTransformDto } from './OfficeItemTransform.dto';

export type OfficeItemOverviewDto = {
	id: number;
	item: ItemDto;
	officeId: number;
	transform: OfficeItemTransformDto;
	createdAt: Date;
};
