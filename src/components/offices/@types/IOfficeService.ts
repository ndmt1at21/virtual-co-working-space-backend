import { Pageable } from '@src/@types/Pageable';
import { CreateOfficeDto } from './dto/CreateOffice.dto';
import { OfficeDetailDto } from './dto/OfficeDetail.dto';
import { OfficeOverviewDto } from './dto/OfficeOverview.dto';
import { OfficeWithItemsDto } from './dto/OfficeWithItems.dto';
import { OfficeWithMembersDto } from './dto/OfficeWithMembers.dto';

export interface IOfficeService {
	createOffice(
		createdUserId: string,
		createOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto>;

	deleteOfficeById(officeId: string): Promise<void>;

	findOfficeOverviewById(id: string): Promise<OfficeOverviewDto>;

	findOfficeDetailById(id: string): Promise<OfficeDetailDto>;

	findAllOfficesOverview(pageable: Pageable): Promise<OfficeOverviewDto[]>;

	findAllOfficesOverviewUserIsMemberByUserId(
		userId: string,
		pageable: Pageable
	): Promise<[OfficeOverviewDto[], number]>;

	findOfficeItemsById(officeId: string): Promise<OfficeWithItemsDto>;

	findOfficeMembersById(officeId: string): Promise<OfficeWithMembersDto>;

	updateOfficeById(
		officeId: string,
		updateOfficeDto: CreateOfficeDto
	): Promise<OfficeOverviewDto>;
}
