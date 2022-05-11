import { AppearanceDto } from './@types/dto/Appearance.dto';
import { Appearance } from './appearance.entity';

export const mapAppearanceToAppearanceDto = (
	appearance: Appearance
): AppearanceDto => {
	const { id, key, value, createdAt, updatedAt } = appearance;

	return {
		id,
		key,
		value,
		createdAt,
		updatedAt
	};
};
