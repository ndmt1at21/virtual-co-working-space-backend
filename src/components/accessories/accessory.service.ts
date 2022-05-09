import { NotFoundError } from '@src/utils/appError';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { AccessoryDto } from './@types/dto/Accessory.dto';
import { CreateAccessoryDto } from './@types/dto/CreateAccessory.dto';
import { UpdateAccessoryDto } from './@types/dto/UpdateAccessory.dto';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAccessoriesOptions';
import { IAccessoryService } from './@types/IAccessoryService';
import { AccessoryErrorMessages } from './accessory.error';
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

		const accessory = await accessoryRepository.findAccessoryById(
			createdAccessory.id
		);

		return mapAccessoryToAccessoryDto(accessory!);
	};

	const updateAccessoryById = async (
		id: number,
		updateAccessoryDto: UpdateAccessoryDto
	): Promise<AccessoryDto> => {
		const updateResult = await accessoryRepository.update(
			id,
			updateAccessoryDto
		);

		if (updateResult.affected === 0) {
			throw new NotFoundError(`Accessory with id ${id} not found`);
		}

		const accessory = await accessoryRepository.findAccessoryById(id);

		return mapAccessoryToAccessoryDto(accessory!);
	};

	const findAccessoryById = async (id: number): Promise<AccessoryDto> => {
		const accessory = await accessoryRepository.findAccessoryById(id);

		if (!accessory) {
			throw new NotFoundError(`Accessory with id ${id} not found`);
		}

		return mapAccessoryToAccessoryDto(accessory);
	};

	const findAccessories = async (
		options: FindAllAccessoriesOptions
	): Promise<[AccessoryDto[], PaginationInfo]> => {
		const [accessories, pageInfo] =
			await accessoryRepository.findAccessories(options);

		const accessoriesDto = accessories.map(accessory =>
			mapAccessoryToAccessoryDto(accessory)
		);

		return [accessoriesDto, pageInfo];
	};

	const deleteAccessoryById = async (id: number): Promise<void> => {
		const deleteResult = await accessoryRepository.softDelete(id);

		if (deleteResult.affected === 0) {
			throw new NotFoundError(AccessoryErrorMessages.ACCESSORY_NOT_FOUND);
		}
	};

	return {
		createAccessory,
		updateAccessoryById,
		findAccessoryById,
		deleteAccessoryById,
		findAccessories
	};
};
