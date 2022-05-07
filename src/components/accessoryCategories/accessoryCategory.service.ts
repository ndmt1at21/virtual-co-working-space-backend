import { NotFoundError } from '@src/utils/appError';
import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { AccessoryCategoryDto } from './@types/dto/AccessoryCategory.dto';
import { CreateAccessoryCategoryDto } from './@types/dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './@types/dto/UpdateAccessoryCategory.dto';
import { IAccessoryCategoryService } from './@types/IAccessoryCategoryService';
import { AccessoryCategoryErrorMessages } from './accessoryCategory.error';
import { mapAccessoryCategoryToAccessoryCategoryDto } from './accessoryCategory.mapping';
import { AccessoryCategoryRepository } from './accessoryCategory.repository';

export const AccessoryCategoryService = (
	accessoryCategoryRepository: AccessoryCategoryRepository
): IAccessoryCategoryService => {
	const create = async (
		category: CreateAccessoryCategoryDto
	): Promise<AccessoryCategoryDto> => {
		const createdCategory = await accessoryCategoryRepository.save(
			category
		);

		const categoryDto =
			mapAccessoryCategoryToAccessoryCategoryDto(createdCategory);

		return categoryDto;
	};

	const updateAccessoryCategoryById = async (
		id: number,
		category: UpdateAccessoryCategoryDto
	): Promise<AccessoryCategoryDto> => {
		const updateResult = await accessoryCategoryRepository.update(
			id,
			category
		);

		if (updateResult.affected === 0) {
			throw new NotFoundError(
				AccessoryCategoryErrorMessages.ACCESSORY_CATEGORY_NOT_FOUND
			);
		}

		const updatedCategory = await accessoryCategoryRepository.findById(id);
		const categoryDto = mapAccessoryCategoryToAccessoryCategoryDto(
			updatedCategory!
		);

		return categoryDto;
	};

	const getAllAccessoryCategories = async (
		pageable?: Pageable
	): Promise<[AccessoryCategoryDto[], PaginationInfo]> => {
		const [categories, pagination] =
			await accessoryCategoryRepository.findAllAccessoryCategories(
				pageable
			);

		const categoriesDto = categories.map(category =>
			mapAccessoryCategoryToAccessoryCategoryDto(category)
		);

		return [categoriesDto, pagination];
	};

	return { create, getAllAccessoryCategories, updateAccessoryCategoryById };
};
