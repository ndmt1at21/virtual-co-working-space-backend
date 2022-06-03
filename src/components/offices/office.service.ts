import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { mapOfficeItemToOfficeItemOverviewDto } from '../officeItems/officeItem.mapping';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { OfficeWithItemsDto } from './@types/dto/OfficeWithItems.dto';
import { OfficeWithMembersDto } from './@types/dto/OfficeWithMembers.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { IOfficeService } from './@types/IOfficeService';
import { OfficeServiceParams } from './@types/OfficeServiceParams';

export const OfficeService = ({
	officeRepository,
	officeItemRepository,
	officeMemberRepository,
	officeRoleRepository,
	officeCreator,
	officeMemberCreator,
	officeValidate,
	officeInvitationCodeGenerator,
	conversationRepository
}: OfficeServiceParams): IOfficeService => {
	const createOffice = async (
		createdUserId: number,
		createOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto> => {
		const invitationCode = officeInvitationCodeGenerator.generate();

		const ownerRole = await officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.OWNER
		);

		const createdOffice = await officeRepository.saveOffice(
			{
				invitationCode,
				createdByUserId: createdUserId,
				name: createOfficeDto.name,
				description: createOfficeDto.description
			},
			[ownerRole!],
			'general'
		);

		const officeDto = await officeCreator.createOfficeOverviewById(
			createdOffice.id
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
			name: payload.name,
			avatarUrl: payload.avatar,
			description: payload.description
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
		options: FindAllOfficesOptions
	): Promise<[OfficeOverviewDto[], PaginationInfo]> => {
		return await officeCreator.createOfficesOverview(options);
	};

	const findAllOfficesOverviewUserIsMemberByUserId = async (
		userId: number,
		pageable: Pageable
	): Promise<[OfficeOverviewDto[], number]> => {
		const officeMembers = await officeMemberRepository
			.queryBuilder()
			.findByMemberId(userId)
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

	const changeBlockStatusOfOfficeById = async (
		id: number,
		block: boolean
	): Promise<void> => {
		await officeValidate.checkOfficeExistsById(id);
		await officeRepository.save({
			id,
			isBlocked: block
		});
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
		changeBlockStatusOfOfficeById,
		deleteOfficeById
	};
};
