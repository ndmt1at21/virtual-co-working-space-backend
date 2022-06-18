import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateOfficeDto {
	@Expose()
	@IsDefined()
	@Length(1, 255)
	name: string;

	@Expose()
	@MaxLength(2000)
	description?: string;
}
