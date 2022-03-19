import { Pageable } from '@src/@types/Pageable';
import { UpdateOfficeMemberTransformDto } from '@src/components/officeMemberTransform/@types/dto/UpdateOfficeMemberTransform';
import { CreateOfficeMemberDto } from './dto/CreateOfficeMember.dto';
import { OfficeMemberDetailDto } from './dto/OfficeMemberDetail.dto';
import { OfficeMemberOverviewDto } from './dto/OfficeMemberOverview.dto';
import { OfficeMemberOnlineStatus } from './OfficeMemberOnlineStatus';

export interface IOfficeMemberService {
	createOfficeMember(
		createOfficeMemberDto: CreateOfficeMemberDto
	): Promise<OfficeMemberOverviewDto>;

	deleteOfficeMemberById(id: string): Promise<void>;

	updateOfficeMemberTransformById(
		id: string,
		transform: UpdateOfficeMemberTransformDto
	): Promise<void>;

	findOfficeMemberDetailById(id: string): Promise<OfficeMemberDetailDto>;

	findOfficeMembersDetail(
		pageable: Pageable
	): Promise<[OfficeMemberDetailDto[], number]>;

	setOfficeMemberOnlineStatusById(
		id: string,
		status: OfficeMemberOnlineStatus
	): Promise<void>;
}
