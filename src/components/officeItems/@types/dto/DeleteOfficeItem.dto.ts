import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class DeleteOfficeItemDto {
	@IsDefined()
	@Expose()
	id: number;
}
