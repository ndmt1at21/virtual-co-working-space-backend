import { Expose } from 'class-transformer';
import { Length } from 'class-validator';

export class UpdateAccessoryCategoryDto {
	@Expose()
	@Length(1, 255)
	name?: string;

	@Expose()
	@Length(1, 255)
	description?: string;
}
