import { Expose } from 'class-transformer';
import {
	IsDefined,
	IsNumber,
	IsOptional,
	IsUrl,
	Length
} from 'class-validator';

export class CreateAccessoryDto {
	@IsDefined()
	@Expose()
	@Length(1, 100)
	name: string;

	@IsDefined()
	@Expose()
	@IsUrl()
	path: string;

	@Expose()
	@Length(1, 255)
	@IsOptional()
	description?: string;

	@Expose()
	creatorId: number;
}
