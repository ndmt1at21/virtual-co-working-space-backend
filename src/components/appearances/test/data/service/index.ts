export const createAppearance = {
	valid: {
		input: {
			appearances: [
				{ key: 'hair', value: 1, userId: 1 },
				{ key: 'eye', value: 5, userId: 1 }
			],

			userId: 1
		},
		output: {
			appearances: [
				{ key: 'hair', value: 1, userId: 1 },
				{ key: 'eye', value: 5, userId: 1 },
				{ key: 'head', value: 9, userId: 1 }
			]
		},
		repo: {
			appearancesByKeysAndUserId: [
				{ key: 'eye', value: 1, userId: 1 },
				{ key: 'head', value: 1, userId: 1 }
			]
		}
	}
};
