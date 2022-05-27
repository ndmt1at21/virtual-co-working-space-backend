import { NotFoundError } from '@src/utils/appError';
import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { CreateItemCategoryDto } from './@types/dto/CreateItemCategory.dto';
import { ItemCategoryDetailDto } from './@types/dto/ItemCategoryDetail.dto';
import { UpdateItemCategoryDto } from './@types/dto/UpdateItemCategory,dto';
import { FindAllItemCategoriesOptions } from './@types/filter/FindAllItemCategoriesOptions';
import { IItemCategoryService } from './@types/IItemCategoryService';
import { ItemCategoryErrorMessages } from './itemCategory.error';
import { mapItemCategoryToItemCategoryDetailDto } from './itemCategory.mapping';
import { ItemCategoryRepository } from './itemCategory.repository';

export class ItemCategoryService implements IItemCategoryService {
	constructor(private itemCategoryRepository: ItemCategoryRepository) {}

	create = async (
		category: CreateItemCategoryDto
	): Promise<ItemCategoryDetailDto> => {
		const createdCategory = await this.itemCategoryRepository.save(
			category
		);

		const itemCategory =
			await this.itemCategoryRepository.findItemCategoryById(
				createdCategory.id
			);

		return mapItemCategoryToItemCategoryDetailDto(itemCategory!);
	};

	updateItemCategoryById = async (
		id: number,
		category: UpdateItemCategoryDto
	): Promise<ItemCategoryDetailDto> => {
		const updateResult = await this.itemCategoryRepository.update(
			id,
			category
		);

		if (updateResult.affected === 0) {
			throw new NotFoundError(
				ItemCategoryErrorMessages.ITEM_CATEGORY_NOT_FOUND
			);
		}

		const updatedCategory =
			await this.itemCategoryRepository.findItemCategoryById(id);

		const categoryDto = mapItemCategoryToItemCategoryDetailDto(
			updatedCategory!
		);

		return categoryDto;
	};

	findItemCategoryById = async (
		id: number
	): Promise<ItemCategoryDetailDto> => {
		const itemCategory =
			await this.itemCategoryRepository.findItemCategoryById(id);

		if (!itemCategory) {
			throw new NotFoundError(
				ItemCategoryErrorMessages.ITEM_CATEGORY_NOT_FOUND
			);
		}

		return mapItemCategoryToItemCategoryDetailDto(itemCategory);
	};

	findAllItemCategories = async (
		options: FindAllItemCategoriesOptions
	): Promise<[ItemCategoryDetailDto[], PaginationInfo]> => {
		const [categories, pagination] =
			await this.itemCategoryRepository.findAllItemCategories(options);

		const categoriesDto = categories.map(category =>
			mapItemCategoryToItemCategoryDetailDto(category)
		);

		return [categoriesDto, pagination];
	};

	async deleteItemCategoryById(id: number): Promise<void> {
		const itemCategory = await this.itemCategoryRepository.findById(id);

		if (!itemCategory) {
			throw new NotFoundError(
				ItemCategoryErrorMessages.ITEM_CATEGORY_NOT_FOUND
			);
		}

		await this.itemCategoryRepository.softDelete(id);
	}
}
