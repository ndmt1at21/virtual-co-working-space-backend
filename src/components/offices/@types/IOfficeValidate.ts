export interface IOfficeValidate {
	checkOfficeExistsById: (id: string) => Promise<void>;
}
