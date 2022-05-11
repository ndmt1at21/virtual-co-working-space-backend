import { NotFoundError } from '@src/utils/appError';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { AppearanceDto } from './@types/dto/Appearance.dto';
import { CreateAppearanceDto } from './@types/dto/CreateAppearance.dto';
import { FindAllAccessoriesOptions } from './@types/filter/FindAllAppearancesOptions';
import { IAppearanceService } from './@types/IAppearanceService';
import { AppearanceErrorMessages } from './appearance.error';
import { mapAppearanceToAppearanceDto } from './appearance.mapping';
import { AppearanceRepository } from './appearance.repository';

export class AppearanceService implements IAppearanceService {
	constructor(private appearanceRepository: AppearanceRepository) {}

	createAppearance = async (
		createAppearanceDto: CreateAppearanceDto
	): Promise<AppearanceDto> => {
		const appearance =
			await this.appearanceRepository.findAppearanceByKeyAndUserId(
				createAppearanceDto.key,
				createAppearanceDto.userId
			);

		if (appearance) {
			const createdAppearance = await this.appearanceRepository.save({
				...appearance,
				...createAppearanceDto
			});

			return mapAppearanceToAppearanceDto(createdAppearance);
		}

		const createdAppearance = await this.appearanceRepository.save({
			...createAppearanceDto
		});

		return mapAppearanceToAppearanceDto(createdAppearance);
	};

	findAllAccessoriesOfUser = async (
		userId: number
	): Promise<AppearanceDto[]> => {
		const appearances =
			await this.appearanceRepository.findAllAccessoriesOfUser(userId);

		const appearancesDto = appearances.map(appearance =>
			mapAppearanceToAppearanceDto(appearance)
		);

		return appearancesDto;
	};

	findAccessories = async (
		options: FindAllAccessoriesOptions
	): Promise<[AppearanceDto[], PaginationInfo]> => {
		const [appearances, pageInfo] =
			await this.appearanceRepository.findAccessories(options);

		const appearancesDto = appearances.map(appearance =>
			mapAppearanceToAppearanceDto(appearance)
		);

		return [appearancesDto, pageInfo];
	};

	deleteAppearanceById = async (id: number): Promise<void> => {
		const deleteResult = await this.appearanceRepository.softDelete(id);

		if (deleteResult.affected === 0) {
			throw new NotFoundError(
				AppearanceErrorMessages.ACCESSORY_NOT_FOUND
			);
		}
	};
}
