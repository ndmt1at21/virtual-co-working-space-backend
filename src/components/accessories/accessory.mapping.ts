import { AccessoryDto } from './@types/dto/Accessory.dto';
import { Accessory } from './accessory.entity';

export const mapAccessoryToAccessoryDto = (
	accessory: Accessory
): AccessoryDto => {
	const { id, path, category, description, createdAt, updatedAt } = accessory;
	return {
		id,
		path,
		description,
		createdAt,
		updatedAt
	};
};
