export interface IOfficeItemValidate {
	checkOfficeItemExistsById(id: string): Promise<void>;
}
