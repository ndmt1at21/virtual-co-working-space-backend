import { HttpStatusCode } from '@src/constant/httpStatusCode';

export const createAppearanceData = {
	valid: {
		req: {
			body: {
				appearances: [
					{
						key: 'headColor',
						value: 1
					},
					{
						key: 'eyeColor',
						value: 2
					}
				]
			},
			user: {
				id: 1
			}
		},

		service: {
			arg: {
				appearances: [
					{
						key: 'headColor',
						value: 1,
						userId: 1
					},
					{
						key: 'eyeColor',
						value: 2,
						userId: 1
					}
				],
				userId: 1
			},
			result: [
				{
					id: 1,
					key: 'headColor',
					value: 1,
					createdAt: '2020-01-01T00:00:00.000Z',
					updatedAt: '2020-01-01T00:00:00.000Z'
				},
				{
					id: 2,
					key: 'eyeColor',
					value: 2,
					createdAt: '2020-01-01T00:00:00.000Z',
					updatedAt: '2020-01-01T00:00:00.000Z'
				}
			]
		},

		res: {
			code: HttpStatusCode.OK,
			data: {
				appearances: [
					{
						id: 1,
						key: 'headColor',
						value: 1,
						createdAt: '2020-01-01T00:00:00.000Z',
						updatedAt: '2020-01-01T00:00:00.000Z'
					},
					{
						id: 2,
						key: 'eyeColor',
						value: 2,
						createdAt: '2020-01-01T00:00:00.000Z',
						updatedAt: '2020-01-01T00:00:00.000Z'
					}
				]
			}
		}
	}
};

export const getAllAppearancesOfUser = {
	service: {
		result: [
			{
				id: 1,
				key: 'headColor',
				value: 1,
				createdAt: '2020-01-01T00:00:00.000Z',
				updatedAt: '2020-01-01T00:00:00.000Z'
			},
			{
				id: 2,
				key: 'eyeColor',
				value: 2,
				createdAt: '2020-01-01T00:00:00.000Z',
				updatedAt: '2020-01-01T00:00:00.000Z'
			}
		]
	},

	req: {
		user: {
			id: 1
		}
	},
	res: {
		code: HttpStatusCode.OK,
		data: {
			appearances: [
				{
					id: 1,
					key: 'headColor',
					value: 1,
					createdAt: '2020-01-01T00:00:00.000Z',
					updatedAt: '2020-01-01T00:00:00.000Z'
				},
				{
					id: 2,
					key: 'eyeColor',
					value: 2,
					createdAt: '2020-01-01T00:00:00.000Z',
					updatedAt: '2020-01-01T00:00:00.000Z'
				}
			]
		}
	}
};

export const appearanceEntityToAppearanceMapping = {
	input: {
		id: 1,
		key: 'hair',
		value: 1,
		userId: 1,
		user: null,
		createdAt: new Date('01-01-2022'),
		updatedAt: new Date('01-01-2022'),
		deletedAt: null
	},
	output: {
		id: 1,
		key: 'hair',
		value: 1,
		userId: 1,
		createdAt: new Date('01-01-2022'),
		updatedAt: new Date('01-01-2022')
	}
};
