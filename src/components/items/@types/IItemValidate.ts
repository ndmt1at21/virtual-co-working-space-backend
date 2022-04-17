export interface IItemValidate {
	checkItemExists: (id: number) => Promise<void>;
}
