import { NotFoundError } from '@src/utils/appError';
import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { AccessoryCategoryDetailDto } from './@types/dto/AccessoryCategoryDetail.dto';
import { CreateAccessoryCategoryDto } from './@types/dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './@types/dto/UpdateAccessoryCategory.dto';
import { IAccessoryCategoryService } from './@types/IAccessoryCategoryService';
import { AccessoryCategoryErrorMessages } from './accessoryCategory.error';
import { mapAccessoryCategoryToAccessoryCategoryDetailDto } from './accessoryCategory.mapping';
import { AccessoryCategoryRepository } from './accessoryCategory.repository';

export const AccessoryCategoryService = (
	accessoryCategoryRepository: AccessoryCategoryRepository
): IAccessoryCategoryService => {
	const create = async (
		category: CreateAccessoryCategoryDto
	): Promise<AccessoryCategoryDetailDto> => {
		const createdCategory = await accessoryCategoryRepository.save(
			category
		);

		const accessoryCategory =
			await accessoryCategoryRepository.findAccessoryCategoryById(
				createdCategory.id
			);

		return mapAccessoryCategoryToAccessoryCategoryDetailDto(
			accessoryCategory!
		);
	};

	const updateAccessoryCategoryById = async (
		id: number,
		category: UpdateAccessoryCategoryDto
	): Promise<AccessoryCategoryDetailDto> => {
		const updateResult = await accessoryCategoryRepository.update(
			id,
			category
		);

		if (updateResult.affected === 0) {
			throw new NotFoundError(
				AccessoryCategoryErrorMessages.ACCESSORY_CATEGORY_NOT_FOUND
			);
		}

		const updatedCategory =
			await accessoryCategoryRepository.findAccessoryCategoryById(id);

		const categoryDto = mapAccessoryCategoryToAccessoryCategoryDetailDto(
			updatedCategory!
		);

		return categoryDto;
	};

	const findAccessoryCategoryById = async (
		id: number
	): Promise<AccessoryCategoryDetailDto> => {
		const accessoryCategory =
			await accessoryCategoryRepository.findAccessoryCategoryById(id);

		if (!accessoryCategory) {
			throw new NotFoundError(
				AccessoryCategoryErrorMessages.ACCESSORY_CATEGORY_NOT_FOUND
			);
		}

		return mapAccessoryCategoryToAccessoryCategoryDetailDto(
			accessoryCategory
		);
	};

	const findAllAccessoryCategories = async (
		pageable?: Pageable
	): Promise<[AccessoryCategoryDetailDto[], PaginationInfo]> => {
		const [categories, pagination] =
			await accessoryCategoryRepository.findAllAccessoryCategories(
				pageable
			);

		const categoriesDto = categories.map(category =>
			mapAccessoryCategoryToAccessoryCategoryDetailDto(category)
		);

		return [categoriesDto, pagination];
	};

	return {
		create,
		findAllAccessoryCategories,
		updateAccessoryCategoryById,
		findAccessoryCategoryById
	};
};
