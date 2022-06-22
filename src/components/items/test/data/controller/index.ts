export const createItemData = {
	valid: {
		req: {
			body: {
				name: 'Sofa',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair',
				categoryId: 1
			}
		},
		res: {
			code: 200,
			data: {
				item: {
					id: 7,
					name: 'Sofa',
					modelPath: 'https://abc.com/model',
					image: 'https://avatar.com/chair',
					category: {
						id: 1,
						name: 'Chair',
						description: null,
						createdAt: new Date('01-01-2022')
					},
					createdAt: new Date('01-01-2022')
				}
			}
		},
		service: {
			result: {
				id: 7,
				name: 'Sofa',
				modelPath: 'https://abc.com/model',
				image: 'https://avatar.com/chair',
				category: {
					id: 1,
					name: 'Chair',
					description: null,
					createdAt: new Date('01-01-2022')
				},
				createdAt: new Date('01-01-2022')
			}
		}
	}
};

export const getItemByIdData = {
	valid: {
		req: {
			params: {
				id: 1
			}
		},
		res: {
			code: 200,
			data: {
				item: {
					id: 1,
					name: 'Chair',
					modelPath: 'https://abc.com/model',
					image: 'https://avatar.com/chair',
					category: {
						id: 1,
						name: 'Chair',
						description: null,
						createdAt: new Date('01-01-2022')
					},
					createdAt: new Date('01-01-2022')
				}
			}
		},
		serviceData: {
			findItemById: {
				result: {
					id: 1,
					name: 'Chair',
					modelPath: 'https://abc.com/model',
					image: 'https://avatar.com/chair',
					category: {
						id: 1,
						name: 'Chair',
						description: null,
						createdAt: new Date('01-01-2022')
					},
					createdAt: new Date('01-01-2022')
				}
			}
		}
	},
	notExists: {
		req: {
			params: {
				id: 1
			}
		},
		res: {
			code: 200,
			data: {
				message: 'item_not_found'
			}
		},
		service: {
			findItemById: {
				throw: 'item_not_found'
			}
		}
	}
};

export const updateItemByIdData = {
	valid: {
		req: {
			params: {
				id: 1
			},
			body: {
				name: 'Long Table',
				image: 'https://avatar.com/chair',
				categoryId: 2
			}
		},
		res: {
			code: 200,
			data: {
				item: {
					id: 1,
					name: 'Long Table',
					modelPath: 'https://abc.com/model',
					image: 'https://avatar.com/long-table',
					category: {
						id: 2,
						name: 'Table',
						description: null,
						createdAt: new Date('01-01-2022')
					},
					createdAt: new Date('01-01-2022')
				}
			}
		},
		serviceData: {
			findItemById: {
				result: {
					id: 1,
					name: 'Long Table',
					modelPath: 'https://abc.com/model',
					image: 'https://avatar.com/long-table',
					category: {
						id: 2,
						name: 'Table',
						description: null,
						createdAt: new Date('01-01-2022')
					},
					createdAt: new Date('01-01-2022')
				}
			}
		}
	},
	notExists: {
		req: {
			params: {
				id: 1
			}
		},
		res: {
			code: 200,
			data: {
				message: 'item_not_found'
			}
		},
		service: {
			findItemById: {
				throw: 'item_not_found'
			}
		}
	}
};
