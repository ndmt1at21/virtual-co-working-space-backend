import { IllegalArgumentError } from '@src/utils/appError';

export const validateCreateItemData = {
	valid: {
		req: {
			body: {
				name: 'Sofa',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair',
				categoryId: 1
			},
			user: {
				id: 1
			}
		}
	},
	nameIsEmpty: {
		req: {
			body: {
				name: '',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair',
				categoryId: 1
			},
			user: {
				id: 1
			}
		},
		res: {
			throwType: IllegalArgumentError
		}
	},
	modelPathIsEmpty: {
		req: {
			body: {
				name: 'Sofa',
				modelPath: '',
				image: 'https://avatar.com/chair',
				categoryId: 1
			},
			user: {
				id: 1
			}
		},
		res: {
			throwType: IllegalArgumentError
		}
	},
	categoryIdIsEmpty: {
		req: {
			body: {
				name: 'Sofa',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair',
				categoryId: ''
			},
			user: {
				id: 1
			}
		},
		res: {
			throwType: IllegalArgumentError
		}
	},
	categoryIdIsUndefined: {
		req: {
			body: {
				name: 'Sofa',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair'
			},
			user: {
				id: 1
			}
		},
		res: {
			throwType: IllegalArgumentError
		}
	}
};
