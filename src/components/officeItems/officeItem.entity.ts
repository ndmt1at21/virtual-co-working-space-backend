import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Item } from '@src/components/items/item.entity';
import { Office } from '@src/components/offices/office.entity';
import { BaseEntity } from '../base/BaseEntity';

@Entity({ name: 'office_item' })
export class OfficeItem extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@PrimaryColumn({ name: 'item_id' })
	itemId: string;

	@PrimaryColumn({ name: 'office_id' })
	officeId: string;

	@Column({ name: 'x_rotation' })
	xRotation: number;

	@Column({ name: 'y_rotation' })
	yRotation: number;

	@Column({ name: 'z_rotation' })
	zRotation: number;

	@Column({ name: 'x_position' })
	xPosition: number;

	@Column({ name: 'y_position' })
	yPosition: number;

	@Column({ name: 'z_position' })
	zPosition: number;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}