export interface IItemValidate {
	checkItemExists: (id: number) => Promise<void>;

	checkItemCategoryExists: (id: number) => Promise<void>;
}
