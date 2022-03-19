import { Pageable } from '@src/@types/Pageable';
import { OfficeItemRepository } from '../officeItems/officeItem.repository';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
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
		id: string
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
		id: string
	): Promise<OfficeDetailDto> => {
		const office = await officeRepository
			.queryBuilder()
			.findById(id)
			.withCreator()
			.build()
			.getOne();

		const members = await officeMemberRepository
			.queryBuilder()
			.findByOfficeId(id)
			.withMember()
			.withTransform()
			.build()
			.getMany();

		const items =
			await officeItemRepository.findOfficeItemsWithItemByOfficeId(id);

		return mapOfficeToOfficeDetailDto({
			office: office!,
			officeItems: items,
			officeMembers: members
		});
	};

	const createOfficesOverviewsByIds = async (
		ids: string[]
	): Promise<OfficeOverviewDto[]> => {
		const offices = await officeRepository
			.queryBuilder()
			.findByIds(ids)
			.withCreator()
			.build()
			.getMany();

		return offices.map(office => mapOfficeToOfficeOverviewDto(office));
	};

	const createOfficesOverview = async (
		pageable: Pageable
	): Promise<OfficeOverviewDto[]> => {
		const offices = await officeRepository
			.queryBuilder()
			.withCreator()
			.withPageable(pageable)
			.build()
			.getMany();

		return offices.map(office => mapOfficeToOfficeOverviewDto(office));
	};

	return {
		createOfficeOverviewById,
		createOfficesOverviewsByIds,
		createOfficeDetailById,
		createOfficesOverview
	};
};
