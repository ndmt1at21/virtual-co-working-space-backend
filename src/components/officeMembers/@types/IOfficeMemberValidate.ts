export interface IOfficeMemberValidate {
	checkExistsOfficeMemberById(id: string): Promise<void>;

	checkUniqueUserInOffice(userId: string, officeId: string): Promise<void>;
}
