export type ResponseDataOptions = {
	data: any;
	code: number;
	message?: string;
};

export const generateResponseData = (dataOptions: ResponseDataOptions) => {
	const { code, data, message } = dataOptions;

	if (message) {
		return {
			code,
			data: {
				...data
			},
			message
		};
	}

	return {
		code,
		data: {
			...data
		}
	};
};
