import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { AccessoryCategoryDetailDto } from './dto/AccessoryCategoryDetail.dto';
import { CreateAccessoryCategoryDto } from './dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './dto/UpdateAccessoryCategory.dto';

export interface IAccessoryCategoryService {
	create(
		category: CreateAccessoryCategoryDto
	): Promise<AccessoryCategoryDetailDto>;

	findAccessoryCategoryById(id: number): Promise<AccessoryCategoryDetailDto>;

	updateAccessoryCategoryById(
		id: number,
		category: UpdateAccessoryCategoryDto
	): Promise<AccessoryCategoryDetailDto>;

	findAllAccessoryCategories(
		pageable?: Pageable
	): Promise<[AccessoryCategoryDetailDto[], PaginationInfo]>;
}
