import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { Transform3dDto } from './Transform3D.dto';

export type OfficeMemberOverviewDto = {
	id: string;
	member: UserOverviewDto;
	officeId: string;
	transform: Transform3dDto;
	onlineStatus: string;
};
