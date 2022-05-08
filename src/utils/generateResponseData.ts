export type ResponseDataOptions = {
	data: any;
	code: number;
	message?: string;
};

export const generateResponseData = (dataOptions: ResponseDataOptions) => {
	const { code, data, message } = dataOptions;

	return {
		code,
		data: {
			...data
		},
		message
	};
};
