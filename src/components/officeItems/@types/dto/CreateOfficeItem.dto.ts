import { Expose } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateOfficeItemDto {
	officeId: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	itemId: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	xRotation: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	yRotation: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	zRotation: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	xPosition: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	yPosition: number;

	@IsDefined()
	@IsNumber()
	@Expose()
	zPosition: number;
}
