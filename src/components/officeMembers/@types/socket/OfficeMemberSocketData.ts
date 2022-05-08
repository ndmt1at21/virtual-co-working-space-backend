export type OfficeData = {
	id: number;
	conversationId: number;
};

export type OfficeMemberData = {
	id: number;
	officeId: number;
	memberId: number;
};

export interface OfficeMemberSocketData {
	office: OfficeData;
	officeMember: OfficeMemberData;
}
