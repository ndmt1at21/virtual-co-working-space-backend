export const findAppearancesByUserIdsData = {
	valid: {
		input: {
			userIds: [1, 2, 3, 4]
		},
		output: {
			appearances: [
				{ key: 'hair', value: 1, userId: 1 },
				{ key: 'eye', value: 2, userId: 2 },
				{ key: 'shoes', value: 10, userId: 4 }
			]
		}
	}
};

export const findAppearanceByKeysAndUserIdData = {
	valid: {
		input: {
			keys: ['hair', 'eye', 'shoes'],
			userId: 1
		},
		output: {
			appearances: [
				{ key: 'hair', value: 1, userId: 1 },
				{ key: 'eye', value: 2, userId: 1 },
				{ key: 'shoes', value: 10, userId: 1 }
			]
		}
	}
};

export const findAllAppearancesOfUserData = {
	valid: {
		input: {
			userId: 1
		},
		output: {
			appearances: [
				{ key: 'hair', value: 1, userId: 1 },
				{ key: 'eye', value: 2, userId: 1 },
				{ key: 'shoes', value: 10, userId: 1 }
			]
		}
	}
};
