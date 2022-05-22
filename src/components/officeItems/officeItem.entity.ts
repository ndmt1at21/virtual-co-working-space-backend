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
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'item_id' })
	itemId: number;

	@Column({ name: 'office_id' })
	officeId: number;

	@Column({ name: 'x_rotation', type: 'float', default: 0 })
	xRotation: number;

	@Column({ name: 'y_rotation', type: 'float', default: 0 })
	yRotation: number;

	@Column({ name: 'z_rotation', type: 'float', default: 0 })
	zRotation: number;

	@Column({ name: 'x_position', type: 'float', default: 0 })
	xPosition: number;

	@Column({ name: 'y_position', type: 'float', default: 0 })
	yPosition: number;

	@Column({ name: 'z_position', type: 'float', default: 0 })
	zPosition: number;

	@ManyToOne(() => Item)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToOne(() => Office)
	@JoinColumn({ name: 'office_id' })
	office: Office;
}
