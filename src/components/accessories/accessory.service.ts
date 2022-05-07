import { AccessoryDto } from './@types/dto/Accessory.dto';
import { CreateAccessoryDto } from './@types/dto/CreateAccessory.dto';
import { UpdateAccessoryDto } from './@types/dto/UpdateAccessory.dto';
import { IAccessoryService } from './@types/IAccessoryService';
import { mapAccessoryToAccessoryDto } from './accessory.mapping';
import { AccessoryRepository } from './accessory.repository';

export const AccessoryService = (
	accessoryRepository: AccessoryRepository
): IAccessoryService => {
	const createAccessory = async (
		createAccessoryDto: CreateAccessoryDto
	): Promise<AccessoryDto> => {
		const createdAccessory = await accessoryRepository.save(
			createAccessoryDto
		);

		// TODO: join category?
		return mapAccessoryToAccessoryDto(createdAccessory);
	};

	const updateAccessoryById = async (
		id: number,
		updateAccessoryDto: UpdateAccessoryDto
	): Promise<AccessoryDto> => {
		const updatedAccessory = await accessoryRepository.update(
			id,
			updateAccessoryDto
		);
		return mapAccessoryToAccessoryDto(updatedAccessory);
	};

	return { createAccessory, updateAccessoryById };
};
