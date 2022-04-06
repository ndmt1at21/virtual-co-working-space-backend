export type OfficeMemberData = {
	id: number;
	officeId: number;
	memberId: number;
};

export interface OfficeMemberSocketData {
	officeMember: OfficeMemberData;
}
