import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class CreateItemDto {
	@IsDefined()
	@Expose()
	name: string;

	@IsDefined()
	@Expose()
	modelPath: string;
}
