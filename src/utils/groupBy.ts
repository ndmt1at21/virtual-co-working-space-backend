export const groupBy = <T>(
	array: T[],
	keyValueGetter: (element: T) => string
): { [key: string]: T[] } => {
	type GroupedObject = { [key: string]: T[] };

	return array.reduce((acc, curr) => {
		const key = keyValueGetter(curr);

		if (!acc[key]) {
			acc[key] = [];
		}

		acc[key].push(curr);

		return acc;
	}, {} as GroupedObject);
};
