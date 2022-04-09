import { EntityRepository } from 'typeorm';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { BaseRepository } from '../base/BaseRepository';
import { Pageable } from '@src/@types/Pageable';
import { OfficeItemTransformDto } from './@types/dto/OfficeItemTransform.dto';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends BaseRepository<OfficeItem> {
	async existsOfficeItemById(id: number) {
		const count = await this.createQueryBuilder('office_item')
			.where('office_item.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async updateOfficeItemTransformById(
		id: number,
		transform: OfficeItemTransformDto
	): Promise<void> {
		await this.update(id, { ...transform });
	}

	async findOfficeItemWithItemById(
		id: number
	): Promise<OfficeItem | undefined> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.where('office_item.id = :id', { id })
			.getOne();
	}

	async findOfficeItemWithItemAndOfficeById(
		id: number
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
		officeId: number
	): Promise<OfficeItem[]> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.where('office_item.officeId = :officeId', { officeId })
			.getMany();
	}
}
