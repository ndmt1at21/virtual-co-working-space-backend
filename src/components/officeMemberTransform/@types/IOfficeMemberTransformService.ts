import { OfficeMemberTransform } from '../officeMemberTransform.entity';
import { OfficeMemberTransformDto } from './dto/OfficeMemberTransform.dto';
import { UpdateOfficeMemberTransformDto } from './dto/UpdateOfficeMemberTransform';

export interface IOfficeMemberTransformService {
	updateTransformInCacheById(
		officeMemberId: string,
		transformDto: UpdateOfficeMemberTransformDto
	): Promise<void>;

	backupTransformFromCacheById(id: string): Promise<void>;

	findTransformById(
		id: string
	): Promise<OfficeMemberTransformDto | undefined>;
}
