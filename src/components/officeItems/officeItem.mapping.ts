import { mapItemToItemDto } from '../items/item.mapping';
import { mapOfficeToOfficeOverviewDto } from '../offices/office.mapping';
import { OfficeItemDetailDto } from './@types/dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './@types/dto/OfficeItemOverviewDto';
import { OfficeItem } from './officeItem.entity';

export const mapOfficeItemToOfficeItemOverviewDto = (
	officeItem: OfficeItem
): OfficeItemOverviewDto => {
	const { id, item, officeId, createdAt, ...transform } = officeItem;
	return { id, officeId, transform, createdAt, item: mapItemToItemDto(item) };
};

export const mapOfficeItemToOfficeItemDetailDto = (
	officeItem: OfficeItem
): OfficeItemDetailDto => {
	const { id, item, office, createdAt, ...transform } = officeItem;

	return {
		id,
		item: mapItemToItemDto(item),
		office: mapOfficeToOfficeOverviewDto(office),
		transform,
		createdAt
	};
};
