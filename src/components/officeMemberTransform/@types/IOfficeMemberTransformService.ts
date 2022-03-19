import { OfficeMemberTransform } from '../officeMemberTransform.entity';
import { OfficeMemberTransformDto } from './dto/OfficeMemberTransform.dto';
import { UpdateOfficeMemberTransformDto } from './dto/UpdateOfficeMemberTransform';

export interface IOfficeMemberTransformService {
	createTransform(
		officeMemberId: string,
		memberTransform?: OfficeMemberTransform
	): Promise<OfficeMemberTransformDto>;

	updateTransform(
		officeMemberId: string,
		memberTransform: UpdateOfficeMemberTransformDto
	): Promise<void>;

	deleteTransform(id: string): Promise<void>;

	findTransformByOfficeMemberId(
		memberId: string
	): Promise<OfficeMemberTransformDto | undefined>;
}
