export interface IOfficeValidate {
	checkOfficeExistsById: (id: number) => Promise<void>;
}
