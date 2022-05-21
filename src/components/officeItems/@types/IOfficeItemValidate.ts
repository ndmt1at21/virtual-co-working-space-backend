export interface IOfficeItemValidate {
	checkOfficeItemExistsById(id: number): Promise<void>;

	checkOfficeAndItemExists(officeId: number, itemId: number): Promise<void>;
}
