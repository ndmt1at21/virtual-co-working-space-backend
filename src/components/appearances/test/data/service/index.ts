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
			],
			save: {}
		}
	}
};

export const findAllAppearancesOfUserData = {
	valid: {
		input: { userId: 1 },
		output: {
			appearances: [
				{
					id: 1,
					key: 'hairColor',
					value: 1,
					userId: 1,
					createdAt: new Date('01-01-2022'),
					updatedAt: new Date('01-01-2022')
				},
				{
					id: 2,
					key: 'hairColor',
					value: 10,
					userId: 1,
					createdAt: new Date('01-01-2022'),
					updatedAt: new Date('01-01-2022')
				}
			]
		},
		repo: {
			findAllAppearancesOfUser: {
				appearances: [
					{
						id: 1,
						key: 'hairColor',
						value: 1,
						userId: 1,
						createdAt: new Date('01-01-2022'),
						updatedAt: new Date('01-01-2022')
					},
					{
						id: 2,
						key: 'hairColor',
						value: 10,
						userId: 1,
						createdAt: new Date('01-01-2022'),
						updatedAt: new Date('01-01-2022')
					}
				]
			}
		}
	}
};
