export type OfficeMemberData = {
	id: number;
	memberId: number;
	officeId: number;
};

export interface OfficeSocketData {
	officeId: number;
	officeMember: OfficeMemberData;
}
