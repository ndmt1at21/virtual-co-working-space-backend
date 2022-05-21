import { DeepPartial, EntityRepository, getManager } from 'typeorm';
import { OfficeItem } from '@src/components/officeItems/officeItem.entity';
import { BaseRepository } from '../base/BaseRepository';
import { OfficeItemTransformDto } from './@types/dto/OfficeItemTransform.dto';
import { Pageable } from '../base/@types/FindAllOptions';
import { Office } from '../offices/office.entity';

@EntityRepository(OfficeItem)
export class OfficeItemRepository extends BaseRepository<OfficeItem> {
	async existsOfficeItemById(id: number) {
		const count = await this.createQueryBuilder('office_item')
			.where('office_item.id = :id', { id })
			.getCount();

		return count === 1;
	}

	async saveOfficeItem(entity: DeepPartial<OfficeItem>): Promise<OfficeItem> {
		const officeItem = await getManager().transaction(
			async transactionManager => {
				const officeItem = transactionManager.create(
					OfficeItem,
					entity
				);

				const createdOfficeItem =
					await transactionManager.save<OfficeItem>(officeItem);

				await transactionManager.increment(
					Office,
					{ id: entity.officeId! },
					'numberOfItems',
					1
				);

				return createdOfficeItem;
			}
		);

		return officeItem;
	}

	async updateOfficeItemTransformById(
		id: number,
		transform: OfficeItemTransformDto
	): Promise<void> {
		await this.update(id, { ...transform });
	}

	async findOfficeItemWithItemAndItemCategoryById(
		id: number
	): Promise<OfficeItem | undefined> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('item.category', 'item_category')
			.where('office_item.id = :id', { id })
			.getOne();
	}

	async findOfficeItemWithItemAndOfficeById(
		id: number
	): Promise<OfficeItem | undefined> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('item.category', 'item_category')
			.leftJoinAndSelect('office_item.office', 'office')
			.leftJoinAndSelect('office.createdBy', 'user')
			.where('office_item.id = :id', { id })
			.getOne();
	}

	async findOfficeItemsWithItemAndOffice(pageable: Pageable) {
		const { page = 10, limit = 10 } = pageable;

		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('item.category', 'item_category')
			.leftJoinAndSelect('office_item.office', 'office')
			.leftJoinAndSelect('office.createdBy', 'user')
			.skip((page - 1) * limit)
			.limit(limit)
			.getMany();
	}

	async findOfficeItemsWithItemByOfficeId(
		officeId: number
	): Promise<OfficeItem[]> {
		return this.createQueryBuilder('office_item')
			.leftJoinAndSelect('office_item.item', 'item')
			.leftJoinAndSelect('item.category', 'item_category')
			.where('office_item.officeId = :officeId', { officeId })
			.getMany();
	}
}
