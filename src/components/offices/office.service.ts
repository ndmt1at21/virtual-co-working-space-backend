import { Pageable } from '@src/@types/Pageable';
import { IOfficeInvitationCodeGenerator } from './components/officeInvitationCodeGenerator/@types/IOfficeInvitationCodeGenerator';
import { mapOfficeItemToOfficeItemOverviewDto } from '../officeItems/officeItem.mapping';
import { OfficeItemRepository } from '../officeItems/officeItem.repository';
import { IOfficeMemberCreator } from '../officeMembers/@types/IOfficeMemberCreator';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { OfficeRoleRepository } from '../officeRoles/officeRole.repository';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { OfficeWithItemsDto } from './@types/dto/OfficeWithItems.dto';
import { OfficeWithMembersDto } from './@types/dto/OfficeWithMembers.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { IOfficeCreator } from './@types/IOfficeCreator';
import { IOfficeService } from './@types/IOfficeService';
import { IOfficeValidate } from './@types/IOfficeValidate';
import { OfficeRepository } from './office.repository';

export const OfficeService = (
	officeRepository: OfficeRepository,
	officeItemRepository: OfficeItemRepository,
	officeMemberRepository: OfficeMemberRepository,
	officeRoleRepository: OfficeRoleRepository,
	officeCreator: IOfficeCreator,
	officeMemberCreator: IOfficeMemberCreator,
	officeValidate: IOfficeValidate,
	officeInvitationCodeGenerator: IOfficeInvitationCodeGenerator
): IOfficeService => {
	const createOffice = async (
		createdUserId: number,
		createOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto> => {
		const invitationCode = officeInvitationCodeGenerator.generate();

		const ownerRole = await officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.OWNER
		);

		const officeMember = officeMemberRepository.create({
			memberId: createdUserId,
			roles: [{ officeRole: ownerRole }],
			transform: {}
		});

		const office = await officeRepository.save({
			invitationCode,
			createdByUserId: createdUserId,
			name: createOfficeDto.name,
			officeMembers: [officeMember]
		});

		const officeDto = await officeCreator.createOfficeOverviewById(
			office.id
		);

		return officeDto;
	};

	const updateOfficeById = async (
		id: number,
		payload: UpdateOfficeDto
	): Promise<OfficeOverviewDto> => {
		await officeValidate.checkOfficeExistsById(id);

		await officeRepository.save({
			id,
			name: payload.name
		});

		return officeCreator.createOfficeOverviewById(id);
	};

	const findOfficeOverviewById = async (
		id: number
	): Promise<OfficeOverviewDto> => {
		await officeValidate.checkOfficeExistsById(id);
		const officeOverview = await officeCreator.createOfficeOverviewById(id);
		return officeOverview;
	};

	const findOfficeDetailById = async (
		id: number
	): Promise<OfficeDetailDto> => {
		await officeValidate.checkOfficeExistsById(id);
		const officeDetail = await officeCreator.createOfficeDetailById(id);
		return officeDetail;
	};

	const findAllOfficesOverview = async (
		pageable: Pageable
	): Promise<OfficeOverviewDto[]> => {
		return await officeCreator.createOfficesOverview(pageable);
	};

	const findAllOfficesOverviewUserIsMemberByUserId = async (
		userId: number,
		pageable: Pageable
	): Promise<[OfficeOverviewDto[], number]> => {
		const officeMembers = await officeMemberRepository
			.queryBuilder()
			.findByMemberId(userId)
			.withPageable(pageable)
			.build()
			.getMany();

		const totalOfficeMembers = await officeMemberRepository
			.queryBuilder()
			.findByMemberId(userId)
			.build()
			.getCount();

		const offices = await officeCreator.createOfficesOverviewsByIds(
			officeMembers.map(om => om.officeId)
		);

		return [offices, totalOfficeMembers];
	};

	const findOfficeItemsById = async (
		id: number
	): Promise<OfficeWithItemsDto> => {
		await officeValidate.checkOfficeExistsById(id);

		const office = await officeCreator.createOfficeOverviewById(id);
		const items =
			await officeItemRepository.findOfficeItemsWithItemByOfficeId(id);

		return {
			office,
			items: items.map(item => mapOfficeItemToOfficeItemOverviewDto(item))
		};
	};

	const findOfficeMembersById = async (
		id: number
	): Promise<OfficeWithMembersDto> => {
		await officeValidate.checkOfficeExistsById(id);

		const office = await officeCreator.createOfficeOverviewById(id);
		const members =
			await officeMemberCreator.createOfficeMembersOverviewByOfficeId(id);

		return {
			office,
			members
		};
	};

	const deleteOfficeById = async (id: number): Promise<void> => {
		await officeValidate.checkOfficeExistsById(id);
		await officeRepository.softDelete(id);
	};

	return {
		createOffice,
		findOfficeOverviewById,
		findOfficeDetailById,
		findAllOfficesOverview,
		findAllOfficesOverviewUserIsMemberByUserId,
		findOfficeItemsById,
		findOfficeMembersById,
		updateOfficeById,
		deleteOfficeById
	};
};
