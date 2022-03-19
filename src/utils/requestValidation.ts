import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type RequestBodyValidationError = {
	[key: string]: string;
};

// validate req.body, return first constraint error or null
export const validateRequestBody = async (
	classToConvert: any,
	body: any
): Promise<RequestBodyValidationError[]> => {
	const data = plainToInstance(classToConvert, body);

	const errors = await validate(data, { skipMissingProperties: true });

	const bodyErrors: RequestBodyValidationError[] = [];

	errors.forEach(err => {
		const { property, constraints } = err;

		if (constraints) {
			const firstKey = Object.keys(constraints)[0];
			bodyErrors.push({ [property]: constraints[firstKey] });
		}
	});

	return bodyErrors;
};
