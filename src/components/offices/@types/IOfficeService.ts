import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { CreateOfficeDto } from './dto/CreateOffice.dto';
import { OfficeDetailDto } from './dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './dto/OfficeOverview.dto';
import { OfficeWithItemsDto } from './dto/OfficeWithItems.dto';
import { OfficeWithMembersDto } from './dto/OfficeWithMembers.dto';
import { FindAllOfficesOptions } from './filter/FindAllOfficesOptions';

export interface IOfficeService {
	createOffice(
		createdUserId: number,
		createOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto>;

	deleteOfficeById(officeId: number): Promise<void>;

	findOfficeOverviewById(id: number): Promise<OfficeOverviewDto>;

	findOfficeDetailById(id: number): Promise<OfficeDetailDto>;

	findAllOfficesOverview(
		options: FindAllOfficesOptions
	): Promise<[OfficeOverviewDto[], PaginationInfo]>;

	findAllOfficesOverviewUserIsMemberByUserId(
		userId: number,
		pageable: Pageable
	): Promise<[OfficeOverviewDto[], number]>;

	findOfficeItemsById(officeId: number): Promise<OfficeWithItemsDto>;

	findOfficeMembersById(officeId: number): Promise<OfficeWithMembersDto>;

	updateOfficeById(
		officeId: number,
		updateOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto>;
}
