import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Transform3dDto } from './Transform3D.dto';

export class UpdateOfficeItemTransformDto {
	@IsDefined()
	@Expose()
	id: number;

	@IsDefined()
	@Expose()
	transform: Transform3dDto;
}
