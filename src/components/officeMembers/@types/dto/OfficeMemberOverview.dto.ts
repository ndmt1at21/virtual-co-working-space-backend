import { Transform3D } from '../Transform3D';

export type OfficeMemberOverviewDto = {
	id: string;
	memberId: string;
	officeId: string;
	transform: Transform3D;
};
