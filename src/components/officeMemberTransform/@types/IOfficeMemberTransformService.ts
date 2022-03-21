import { OfficeMemberTransform } from '../officeMemberTransform.entity';
import { OfficeMemberTransformDto } from './dto/OfficeMemberTransform.dto';
import { UpdateOfficeMemberTransformDto } from './dto/UpdateOfficeMemberTransform';

export interface IOfficeMemberTransformService {
	updateTransformInCacheById(
		officeMemberId: number,
		transformDto: UpdateOfficeMemberTransformDto
	): Promise<void>;

	backupTransformFromCacheById(id: number): Promise<void>;

	findTransformById(
		id: number
	): Promise<OfficeMemberTransformDto | undefined>;
}
