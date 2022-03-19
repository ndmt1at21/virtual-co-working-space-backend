import { EntityRepository } from 'typeorm';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { BaseRepository } from '../base/BaseRepository';
import { Transform3dDto } from './@types/dto/Transform3D.dto';
import { Pageable } from '@src/@types/Pageable';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends BaseRepository<OfficeItem> {
	async existsOfficeItemById(id: string) {
		const count = await this.createQueryBuilder('office_item')
			.where('office_item.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async updateOfficeItemTransformById(
		id: string,
		transform: Transform3dDto
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

	async findOfficeItemWithItemById(
		id: string
	): Promise<OfficeItem | undefined> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.where('office_item.id = :id', { id })
			.getOne();
	}

	async findOfficeItemWithItemAndOfficeById(
		id: string
	): Promise<OfficeItem | undefined> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('office_item.office', 'office')
			.where('office_item.id = :id', { id })
			.getOne();
	}

	async findOfficeItemsWithItemAndOffice(pageable: Pageable) {
		const { page, size } = pageable;

		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('office_item.office', 'office')
			.skip((page - 1) * size)
			.limit(size)
			.getMany();
	}

	async findOfficeItemsWithItemByOfficeId(
		officeId: string
	): Promise<OfficeItem[]> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.where('office_item.officeId = :officeId', { officeId })
			.getMany();
	}
}
