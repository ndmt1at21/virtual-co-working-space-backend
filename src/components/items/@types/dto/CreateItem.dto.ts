import { Expose } from 'class-transformer';
import { IsDefined, IsUrl, Length } from 'class-validator';

export class CreateItemDto {
	@IsDefined()
	@Length(1, 255)
	@Expose()
	name: string;

	@IsDefined()
	@IsUrl()
	@Expose()
	modelPath: string;
}
