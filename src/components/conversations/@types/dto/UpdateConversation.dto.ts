import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, Length } from 'class-validator';

export class UpdateConversationDto {
	@IsOptional()
	@Length(1, 255)
	@Expose()
	name: string;
}
