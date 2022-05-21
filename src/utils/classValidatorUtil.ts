import { plainToClass } from 'class-transformer';
import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	validateSync
} from 'class-validator';

export function IsNestedArray(
	schema: new () => any,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsNestedArray',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					args.value;
					if (Array.isArray(value)) {
						for (let i = 0; i < (<Array<any>>value).length; i++) {
							if (
								validateSync(plainToClass(schema, value[i]))
									.length
							) {
								return false;
							}
						}
						return true;
					} else
						return validateSync(plainToClass(schema, value)).length
							? false
							: true;
				}
			}
		});
	};
}
