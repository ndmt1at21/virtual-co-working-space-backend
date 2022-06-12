import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { CreateItemCategoryDto } from './dto/CreateItemCategory.dto';
import { ItemCategoryDetailDto } from './dto/ItemCategoryDetail.dto';
import { UpdateItemCategoryDto } from './dto/UpdateItemCategory,dto';
import { FindAllItemCategoriesOptions } from './filter/FindAllItemCategoriesOptions';

export interface IItemCategoryService {
	create(category: CreateItemCategoryDto): Promise<ItemCategoryDetailDto>;

	findItemCategoryById(id: number): Promise<ItemCategoryDetailDto>;

	updateItemCategoryById(
		id: number,
		category: UpdateItemCategoryDto
	): Promise<ItemCategoryDetailDto>;

	findAllItemCategories(
		options: FindAllItemCategoriesOptions
	): Promise<[ItemCategoryDetailDto[], PaginationInfo]>;

	deleteItemCategoryById(id: number): Promise<void>;
}
