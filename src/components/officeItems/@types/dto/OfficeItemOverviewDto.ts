import { ItemDto } from '@src/components/items/@types/dto/Item.dto';
import { Transform3dDto } from './Transform3D.dto';

export type OfficeItemOverviewDto = {
	id: string;
	item: ItemDto;
	officeId: string;
	transform: Transform3dDto;
	createdAt: Date;
};
