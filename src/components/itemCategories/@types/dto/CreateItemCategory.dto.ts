import { Expose } from 'class-transformer';
import { IsDefined, Length } from 'class-validator';

export class CreateItemCategoryDto {
	@Expose()
	@IsDefined()
	@Length(1, 255)
	name: string;

	@Expose()
	@IsDefined()
	@Length(1, 255)
	description?: string;

	creatorId: number;
}
