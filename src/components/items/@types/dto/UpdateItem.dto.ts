import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';

export class UpdateItemDto {
	@Expose()
	@Length(1, 255)
	name?: string;

	@Expose()
	@IsUrl()
	modelPath?: string;
}
