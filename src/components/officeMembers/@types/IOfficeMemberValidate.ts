export interface IOfficeMemberValidate {
	checkExistsOfficeMemberById(id: number): Promise<void>;

	checkUniqueUserInOffice(userId: number, officeId: number): Promise<void>;
}
