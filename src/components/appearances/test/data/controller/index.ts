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
			result: {
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
		},

		res: {
			code: HttpStatusCode.OK,
			data: {
				code: HttpStatusCode.OK,
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
