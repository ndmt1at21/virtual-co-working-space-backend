import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { Transform3dDto } from './Transform3D.dto';

export type OfficeItemOverviewDto = {
	id: number;
	item: ItemDto;
	officeId: number;
	transform: Transform3dDto;
	createdAt: Date;
};
