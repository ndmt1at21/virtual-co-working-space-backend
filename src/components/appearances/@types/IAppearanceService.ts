import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { AppearanceDto } from './dto/Appearance.dto';
import { CreateAppearancesDto } from './dto/CreateAppearance.dto';
import { FindAllAppearancesOptions } from './filter/FindAllAppearancesOptions';

export interface IAppearanceService {
	createAppearance(
		createAppearanceDto: CreateAppearancesDto
	): Promise<AppearanceDto[]>;

	deleteAppearanceById(id: number): Promise<void>;

	findAllAppearancesOfUser(userId: number): Promise<AppearanceDto[]>;

	findAllAppearancesInOffice(officeId: number): Promise<AppearanceDto[]>;

	findAppearances(
		options: FindAllAppearancesOptions
	): Promise<[AppearanceDto[], PaginationInfo]>;
}
