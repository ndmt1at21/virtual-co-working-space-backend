import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { AppearanceDto } from './dto/Appearance.dto';
import { CreateAppearancesDto } from './dto/CreateAppearance.dto';
import { FindAllAccessoriesOptions } from './filter/FindAllAppearancesOptions';

export interface IAppearanceService {
	createAppearance(
		createAppearanceDto: CreateAppearancesDto
	): Promise<AppearanceDto[]>;

	deleteAppearanceById(id: number): Promise<void>;

	findAllAccessoriesOfUser(userId: number): Promise<AppearanceDto[]>;

	findAccessories(
		options: FindAllAccessoriesOptions
	): Promise<[AppearanceDto[], PaginationInfo]>;
}
