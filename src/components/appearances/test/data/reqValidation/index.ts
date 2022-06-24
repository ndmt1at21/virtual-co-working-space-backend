import { IllegalArgumentError } from '@src/utils/appError';

export const validateCreateAppearanceData = {
	valid: {
		req: {
			body: {
				appearances: [
					{ key: 'hairColor', value: 1 },
					{ key: 'eyeColor', value: 2 },
					{ key: 'hairStyle', value: 10 }
				]
			},
			user: {
				id: 1
			}
		}
	},
	appearancesArrIsEmpty: {
		req: {
			body: {
				appearances: []
			},
			user: {
				id: 1
			}
		},
		res: {
			errorType: IllegalArgumentError
		}
	},
	appearancesArrIsInvalid: {
		req: {
			body: {
				appearances: [
					{ key: 'hairColor', value: 1 },
					{ key: 1, value: 'black' },
					{ key: 'hairStyle', value: 10 }
				]
			},
			user: {
				id: 1
			}
		},
		res: {
			errorType: IllegalArgumentError
		}
	}
};
