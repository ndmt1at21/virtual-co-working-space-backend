import { Pageable } from '@src/components/base/@types/FindAllOptions';
import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { CreateOfficeMemberDto } from './dto/CreateOfficeMember.dto';
import { OfficeMemberDetailDto } from './dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './dto/OfficeMemberOverview.dto';
import { OfficeMemberOnlineStatus } from './OfficeMemberOnlineStatus';

export interface IOfficeMemberService {
	createOfficeMember(
		createOfficeMemberDto: CreateOfficeMemberDto
	): Promise<OfficeMemberOverviewDto>;

	removeOfficeMemberById(id: number): Promise<void>;

	updateOfficeMemberTransformById(
		id: number,
		transform: UpdateOfficeMemberTransformDto
	): Promise<void>;

	findOfficeMemberOverviewById(id: number): Promise<OfficeMemberOverviewDto>;

	findOfficeMemberDetailById(id: number): Promise<OfficeMemberDetailDto>;

	findOfficeMembersDetail(
		pageable: Pageable
	): Promise<[OfficeMemberDetailDto[], number]>;

	setOfficeMemberOnlineStatusById(
		id: number,
		status: OfficeMemberOnlineStatus
	): Promise<void>;

	addRoleToOfficeMember(
		officeMemberId: number,
		officeRoleId: number
	): Promise<void>;

	removeRoleFromOfficeMember(
		officeMemberId: number,
		officeRoleId: number
	): Promise<void>;
}
