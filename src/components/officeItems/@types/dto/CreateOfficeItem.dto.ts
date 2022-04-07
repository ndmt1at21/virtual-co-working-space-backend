import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class CreateOfficeItemDto {
	@IsDefined()
	@Expose()
	officeId: number;

	@IsDefined()
	@Expose()
	itemId: number;

	@IsDefined()
	@Expose()
	xRotation: number;

	@IsDefined()
	@Expose()
	yRotation: number;

	@IsDefined()
	@Expose()
	zRotation: number;

	@IsDefined()
	@Expose()
	xPosition: number;

	@IsDefined()
	@Expose()
	yPosition: number;

	@IsDefined()
	@Expose()
	zPosition: number;
}
