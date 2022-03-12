import { OfficeOverviewDto } from '@src/components/offices/dto/OfficeOverview.dto';
import { UserOverviewDto } from '@src/components/users/@types/dto/UserOverviewDto';
import { Transform3D } from '../Transform3D';

export type OfficeMemberDetailDto = {
	id: string;
	member: UserOverviewDto;
	office: OfficeOverviewDto;
	transform: Transform3D;
};
