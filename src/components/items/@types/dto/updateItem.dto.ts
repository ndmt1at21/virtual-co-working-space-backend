import { Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';

export class UpdateItemDto {
	@Expose()
	name?: string;

	@IsUrl()
	@Expose()
	modelPath?: string;
}
