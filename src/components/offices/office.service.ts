import { Pageable } from '../base/@types/FindAllOptions';
import { PaginationInfo } from '../base/@types/PaginationInfo';
import { mapOfficeItemToOfficeItemOverviewDto } from '../officeItems/officeItem.mapping';
import { mapOfficeRoleToOfficeRoleDto } from '../officeRoles/officeRole.mapping';
import { mapOfficeToOfficeOverviewDto } from './office.mapping';
import { OfficeItemRepository } from '../officeItems/officeItem.repository';
import { IOfficeMemberCreator } from '../officeMembers/@types/IOfficeMemberCreator';
import { OfficeMemberRepository } from '../officeMembers/officeMember.repository';
import { OfficeRoleDto } from '../officeRoles/@types/OfficeRole.dto';
import { OfficeRoleType } from '../officeRoles/@types/OfficeRoleType';
import { OfficeRoleRepository } from '../officeRoles/officeRole.repository';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { OfficeDetailDto } from './@types/dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './@types/dto/OfficeOverview.dto';
import { OfficeWithItemsDto } from './@types/dto/OfficeWithItems.dto';
import { OfficeWithMembersDto } from './@types/dto/OfficeWithMembers.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { IOfficeCreator } from './@types/IOfficeCreator';
import { IOfficeService } from './@types/IOfficeService';
import { IOfficeValidate } from './@types/IOfficeValidate';
import { IOfficeInvitationCodeGenerator } from './components/officeInvitationCodeGenerator/@types/IOfficeInvitationCodeGenerator';
import { OfficeRepository } from './office.repository';

export class OfficeService implements IOfficeService {
	constructor(
		private readonly officeRepository: OfficeRepository,
		private readonly officeItemRepository: OfficeItemRepository,
		private readonly officeMemberRepository: OfficeMemberRepository,
		private readonly officeRoleRepository: OfficeRoleRepository,
		private readonly officeCreator: IOfficeCreator,
		private readonly officeMemberCreator: IOfficeMemberCreator,
		private readonly officeValidate: IOfficeValidate,
		private readonly officeInvitationCodeGenerator: IOfficeInvitationCodeGenerator
	) {}

	async createOffice(
		createdUserId: number,
		createOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto> {
		const invitationCode = this.officeInvitationCodeGenerator.generate();

		const ownerRole = await this.officeRoleRepository.findOfficeRoleByName(
			OfficeRoleType.OWNER
		);

		const createdOffice = await this.officeRepository.saveOffice(
			{
				invitationCode,
				createdByUserId: createdUserId,
				name: createOfficeDto.name,
				description: createOfficeDto.description
			},
			[ownerRole!],
			'general'
		);

		const officeDto = await this.officeCreator.createOfficeOverviewById(
			createdOffice.id
		);

		return officeDto;
	}

	async updateOfficeById(
		id: number,
		payload: UpdateOfficeDto
	): Promise<OfficeOverviewDto> {
		await this.officeValidate.checkOfficeExistsById(id);

		await this.officeRepository.save({
			id,
			name: payload.name,
			avatarUrl: payload.avatar,
			description: payload.description
		});

		return this.officeCreator.createOfficeOverviewById(id);
	}

	async findOfficeOverviewById(id: number): Promise<OfficeOverviewDto> {
		await this.officeValidate.checkOfficeExistsById(id);
		const officeOverview =
			await this.officeCreator.createOfficeOverviewById(id);

		return officeOverview;
	}

	async findOfficeDetailById(id: number): Promise<OfficeDetailDto> {
		await this.officeValidate.checkOfficeExistsById(id);

		const officeDetail = await this.officeCreator.createOfficeDetailById(
			id
		);
		await this.officeMemberRepository.updateLastActiveDateByOfficeId(id);

		return officeDetail;
	}

	async findAllOfficesOverview(
		options: FindAllOfficesOptions
	): Promise<[OfficeOverviewDto[], PaginationInfo]> {
		return await this.officeCreator.createOfficesOverview(options);
	}

	async findAllOfficesOverviewUserIsMemberByUserId(
		userId: number,
		pageable?: Pageable
	): Promise<[OfficeOverviewDto[], PaginationInfo]> {
		const limit = pageable?.limit || 10;
		const page = pageable?.page || 1;

		const [offices, totalCount] = await this.officeRepository
			.queryBuilder()
			.findOfficeOverviewsUserIsMemberByUserId(userId)
			.withCreator()
			.withPageable({ limit, page })
			.build()
			.getManyAndCount();

		const officesDto = offices.map(office =>
			mapOfficeToOfficeOverviewDto(office)
		);

		return [officesDto, { page, count: offices.length, totalCount }];
	}

	async findOfficeItemsById(id: number): Promise<OfficeWithItemsDto> {
		await this.officeValidate.checkOfficeExistsById(id);

		const office = await this.officeCreator.createOfficeOverviewById(id);
		const items =
			await this.officeItemRepository.findOfficeItemsWithItemByOfficeId(
				id
			);

		return {
			office,
			items: items.map(item => mapOfficeItemToOfficeItemOverviewDto(item))
		};
	}

	async findOfficeMembersById(id: number): Promise<OfficeWithMembersDto> {
		await this.officeValidate.checkOfficeExistsById(id);

		const office = await this.officeCreator.createOfficeOverviewById(id);
		const members =
			await this.officeMemberCreator.createOfficeMembersOverviewByOfficeId(
				id
			);

		return {
			office,
			members
		};
	}

	async changeBlockStatusOfOfficeById(
		id: number,
		block: boolean
	): Promise<void> {
		await this.officeValidate.checkOfficeExistsById(id);
		await this.officeRepository.save({
			id,
			isBlocked: block
		});
	}

	async deleteOfficeById(id: number): Promise<void> {
		await this.officeValidate.checkOfficeExistsById(id);
		await this.officeRepository.softDelete(id);
	}

	async findAllOfficeRoles(): Promise<OfficeRoleDto[]> {
		const officeRoles = await this.officeRoleRepository.find();

		return officeRoles.map(officeRole =>
			mapOfficeRoleToOfficeRoleDto(officeRole)
		);
	}
}
