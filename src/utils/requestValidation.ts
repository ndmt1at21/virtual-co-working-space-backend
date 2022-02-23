import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// validate req.body, return first constraint error or null
export const validateRequestBody = async (
	classToConvert: any,
	body: any
): Promise<string | undefined> => {
	const data = plainToInstance(classToConvert, body);

	const errors = await validate(data, { skipMissingProperties: true });

	if (errors.length > 0) {
		const constraints = errors[0].constraints;
		console.log(constraints);
		return '';
	}
};
