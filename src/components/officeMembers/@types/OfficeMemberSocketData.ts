import { OfficeMember } from '../officeMember.entity';

export type OfficeMemberData = {
	id: string;
	officeId: string;
	memberId: string;
};

export interface OfficeMemberSocketData {
	officeMember: OfficeMemberData;
}
