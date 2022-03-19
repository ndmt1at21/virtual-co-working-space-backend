import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { OfficeOverviewDto } from '@src/components/offices/@types/dto/OfficeOverview.dto';
import { Transform3dDto } from './Transform3D.dto';

export type OfficeItemDetailDto = {
	id: string;
	item: ItemDto;
	office: OfficeOverviewDto;
	transform: Transform3dDto;
	createdAt: Date;
};
