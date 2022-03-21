export interface IOfficeItemValidate {
	checkOfficeItemExistsById(id: number): Promise<void>;
}
