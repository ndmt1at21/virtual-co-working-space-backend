import { NotFoundError } from '@src/utils/appError';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { AppearanceDto } from './@types/dto/Appearance.dto';
import { CreateAppearancesDto } from './@types/dto/CreateAppearance.dto';
import { FindAllAppearancesOptions } from './@types/filter/FindAllAppearancesOptions';
import { IAppearanceService } from './@types/IAppearanceService';
import { Appearance } from './appearance.entity';
import { AppearanceErrorMessages } from './appearance.error';
import { mapAppearanceToAppearanceDto } from './appearance.mapping';
import { AppearanceRepository } from './appearance.repository';

export class AppearanceService implements IAppearanceService {
	constructor(
		private appearanceRepository: AppearanceRepository,
		private officeMemberRepository: OfficeMemberRepository
	) {}

	createAppearance = async (
		createAppearancesDto: CreateAppearancesDto
	): Promise<AppearanceDto[]> => {
		const createdAppearances: Appearance[] = [];

		const { appearances: appearancesDto, userId } = createAppearancesDto;

		const existsAppearances =
			await this.appearanceRepository.findAppearanceByKeysAndUserId(
				appearancesDto.map(appearance => appearance.key),
				userId
			);

		const nonExistsAppearances = appearancesDto.filter(
			appearance =>
				!existsAppearances.some(
					existsAppearance => existsAppearance.key === appearance.key
				)
		);

		if (existsAppearances.length > 0) {
			const updatedAppearances = await this.appearanceRepository.save(
				existsAppearances.map(existsAppearance => ({
					...existsAppearance,
					...appearancesDto.find(
						dto => dto.key === existsAppearance.key
					)
				}))
			);

			// @ts-ignore
			createdAppearances.push(...updatedAppearances);
		}

		if (nonExistsAppearances.length > 0) {
			const createdNonExistsAppearances =
				await this.appearanceRepository.save(nonExistsAppearances);

			// @ts-ignore
			createdAppearances.push(...createdNonExistsAppearances);
		}

		return createdAppearances.map(appearance =>
			mapAppearanceToAppearanceDto(appearance)
		);
	};

	findAllAppearancesOfUser = async (
		userId: number
	): Promise<AppearanceDto[]> => {
		const appearances =
			await this.appearanceRepository.findAllAppearancesOfUser(userId);

		const appearancesDto = appearances.map(appearance =>
			mapAppearanceToAppearanceDto(appearance)
		);

		return appearancesDto;
	};

	findAllAppearancesInOffice = async (
		officeId: number
	): Promise<AppearanceDto[]> => {
		const officeMembers = await this.officeMemberRepository
			.queryBuilder()
			.findByOfficeId(officeId)
			.build()
			.getMany();

		const memberIds = officeMembers.map(om => om.memberId);

		const appearances =
			await this.appearanceRepository.findAppearancesByUserIds(memberIds);

		const appearancesDto = appearances.map(appearance =>
			mapAppearanceToAppearanceDto(appearance)
		);

		return appearancesDto;
	};

	findAppearances = async (
		options: FindAllAppearancesOptions
	): Promise<[AppearanceDto[], PaginationInfo]> => {
		const [appearances, pageInfo] =
			await this.appearanceRepository.findAppearances(options);

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
