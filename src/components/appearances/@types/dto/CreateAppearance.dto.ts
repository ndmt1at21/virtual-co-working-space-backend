import { IsNestedArray } from '@src/utils/classValidatorUtil';
import { Expose, Type } from 'class-transformer';
import {
	IsArray,
	IsDefined,
	IsNumber,
	Length,
	ValidateNested,
	ArrayMaxSize,
	ArrayMinSize
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
	@ArrayMinSize(1, { message: 'Appearances array must have at least 1 item' })
	@ArrayMaxSize(20, { message: 'Appearances array must not exceed 20 items' })
	@IsNestedArray(CreateAppearanceDto, {
		message: 'All element in appearances array must be an appearance object'
	})
	@Type(() => CreateAppearanceDto)
	@Expose()
	appearances: CreateAppearanceDto[];

	userId: number;
}
