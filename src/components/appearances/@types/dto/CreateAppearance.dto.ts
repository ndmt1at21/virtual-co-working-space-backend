import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, Length } from 'class-validator';

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
