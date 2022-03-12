import { EntityRepository } from 'typeorm';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { BaseRepository } from '../base/BaseRepository';
import { Transform3D } from './@types/Transform3D';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends BaseRepository<OfficeItem> {
	async updateOfficeItemTransformById(
		id: string,
		transform: Transform3D
	): Promise<void> {
		const { position, rotation } = transform;
		const { x: xPosition, y: yPosition, z: zPosition } = position;
		const { x: xRotation, y: yRotation, z: zRotation } = rotation;

		await this.update(id, {
			xPosition,
			yPosition,
			zPosition,
			xRotation,
			yRotation,
			zRotation
		});
	}
}
