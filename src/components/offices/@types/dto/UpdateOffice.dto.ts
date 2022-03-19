import { Expose } from 'class-transformer';
import { IsDefined, Length } from 'class-validator';

export class UpdateOfficeDto {
	@Expose()
	@IsDefined()
	@Length(1, 255)
	name: string;
}
