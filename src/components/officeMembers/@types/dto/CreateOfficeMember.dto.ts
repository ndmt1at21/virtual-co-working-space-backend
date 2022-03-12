import { Transform3D } from '../Transform3D';

export type CreateOfficeMemberDto = {
	memberId: string;
	officeId: string;
	transform?: Transform3D;
};
