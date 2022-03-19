import { mapItemToItemDto } from '../items/item.mapping';
import { mapOfficeToOfficeOverviewDto } from '../offices/office.mapping';
import { OfficeItemDetailDto } from './@types/dto/OfficeItemDetail.dto';
import { OfficeItemOverviewDto } from './@types/dto/OfficeItemOverviewDto';
import { Transform3dDto } from './@types/dto/Transform3D.dto';
import { OfficeItem } from './officeItem.entity';

export const mapOfficeItemToOfficeItemOverviewDto = (
	officeItem: OfficeItem
): OfficeItemOverviewDto => {
	const {
		id,
		item,
		officeId,
		createdAt,
		xPosition,
		yPosition,
		zPosition,
		xRotation,
		yRotation,
		zRotation
	} = officeItem;

	const transform: Transform3dDto = {
		position: { x: xPosition, y: yPosition, z: zPosition },
		rotation: { x: xRotation, y: yRotation, z: zRotation }
	};

	return { id, officeId, transform, createdAt, item: mapItemToItemDto(item) };
};

export const mapOfficeItemToOfficeItemDetailDto = (
	officeItem: OfficeItem
): OfficeItemDetailDto => {
	const {
		id,
		item,
		office,
		createdAt,
		xPosition,
		yPosition,
		zPosition,
		xRotation,
		yRotation,
		zRotation
	} = officeItem;

	const transform: Transform3dDto = {
		position: { x: xPosition, y: yPosition, z: zPosition },
		rotation: { x: xRotation, y: yRotation, z: zRotation }
	};

	return {
		id,
		item: mapItemToItemDto(item),
		office: mapOfficeToOfficeOverviewDto(office),
		transform,
		createdAt
	};
};
