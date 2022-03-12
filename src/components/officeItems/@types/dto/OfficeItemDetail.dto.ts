import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { OfficeOverviewDto } from '@src/components/offices/dto/OfficeOverview.dto';
import { Transform3D } from '../Transform3D';

export type OfficeItemDetailDto = {
	id: string;
	item: ItemDto;
	office: OfficeOverviewDto;
	transform: Transform3D;
};
