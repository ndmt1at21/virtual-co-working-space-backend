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
	@ArrayMinSize(1, { message: 'appearances_array_must_have_at_least_1_item' })
	@ArrayMaxSize(20, { message: 'appearances_array_must_not_exceed_20_items' })
	@IsNestedArray(CreateAppearanceDto, {
		message: 'all_element_in_appearances_array_must_be_an_appearance_object'
	})
	@Type(() => CreateAppearanceDto)
	@Expose()
	appearances: CreateAppearanceDto[];

	userId: number;
}
