import { Expose, Type } from 'class-transformer';
import {
	IsArray,
	IsDefined,
	IsNumber,
	Length,
	ValidateNested,
	ArrayMaxSize
} from 'class-validator';

export class CreateAppearanceDto {
	@IsDefined()
	@Expose()
	@Length(1, 200, {
		message: 'Appearance key must be between 1 and 200 characters'
	})
	key: string;

	@IsDefined()
	@Expose()
	@IsNumber()
	value: number;

	userId: number;
}

export class CreateAppearancesDto {
	@IsDefined()
	@IsArray()
	// @ArrayMaxSize(20, { message: 'Appearances array must not exceed 20 items' })
	@ValidateNested({ always: true, each: true })
	@Type(() => CreateAppearanceDto)
	// @Expose()
	appearances: CreateAppearanceDto[];

	userId: number;
}
