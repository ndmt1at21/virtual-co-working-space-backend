import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { AccessoryCategoryDto } from './dto/AccessoryCategory.dto';
import { CreateAccessoryCategoryDto } from './dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './dto/UpdateAccessoryCategory.dto';

export interface IAccessoryCategoryService {
	create(category: CreateAccessoryCategoryDto): Promise<AccessoryCategoryDto>;

	updateAccessoryCategoryById(
		id: number,
		category: UpdateAccessoryCategoryDto
	): Promise<AccessoryCategoryDto>;

	getAllAccessoryCategories(
		pageable?: Pageable
	): Promise<[AccessoryCategoryDto[], PaginationInfo]>;
}
