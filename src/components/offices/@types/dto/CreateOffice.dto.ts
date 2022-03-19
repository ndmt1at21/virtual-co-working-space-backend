import { Expose } from 'class-transformer';
import { IsDefined, Length } from 'class-validator';

export class CreateOfficeDto {
	@Expose()
	@IsDefined()
	@Length(1, 255)
	name: string;
}
