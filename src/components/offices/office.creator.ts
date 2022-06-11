import { PaginationInfo } from '../base/@types/PaginationInfo';
import { OfficeItemRepository } from '../officeItems/officeItem.repository';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { IOfficeCreator } from './@types/IOfficeCreator';
import {
	mapOfficeToOfficeDetailDto,
	mapOfficeToOfficeOverviewDto
} from './office.mapping';
import { OfficeRepository } from './office.repository';

export const OfficeCreator = (
	officeRepository: OfficeRepository,
	officeMemberRepository: OfficeMemberRepository,
	officeItemRepository: OfficeItemRepository
): IOfficeCreator => {
	const createOfficeOverviewById = async (
		id: number
	): Promise<OfficeOverviewDto> => {
		const office = await officeRepository
			.queryBuilder()
			.findById(id)
			.withCreator()
			.build()
			.getOne();

		return mapOfficeToOfficeOverviewDto(office!);
	};

	const createOfficeDetailById = async (
		id: number
	): Promise<OfficeDetailDto> => {
		const office = await officeRepository
			.queryBuilder()
			.findById(id)
			.withCreator()
			.withConversations()
			.build()
			.getOne();

		const members = await officeMemberRepository
			.queryBuilder()
			.findByOfficeId(id)
			.withMember()
			.withRoles()
			.withTransform()
			.build()
			.getMany();

		const items =
			await officeItemRepository.findOfficeItemsWithItemByOfficeId(id);

		return mapOfficeToOfficeDetailDto({
			office: office!,
			officeItems: items,
			officeMembers: members,
			conversations: office!.conversations
		});
	};

	const createOfficesOverview = async (
		options: FindAllOfficesOptions
	): Promise<[OfficeOverviewDto[], PaginationInfo]> => {
		const [offices, totalCount] = await officeRepository
			.queryBuilder()
			.findAllOffices(options)
			.withCreator()
			.build()
			.getManyAndCount();

		const officesOverviewDto = offices.map(office =>
			mapOfficeToOfficeOverviewDto(office)
		);

		return [
			officesOverviewDto,
			{
				count: offices.length,
				page: options.pageable?.page || 1,
				totalCount
			}
		];
	};

	return {
		createOfficeOverviewById,
		createOfficeDetailById,
		createOfficesOverview
	};
};
