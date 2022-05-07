import { AccessoryDto } from './dto/Accessory.dto';
import { CreateAccessoryDto } from './dto/CreateAccessory.dto';
import { UpdateAccessoryDto } from './dto/UpdateAccessory.dto';

export interface IAccessoryService {
	createAccessory(
		createAccessoryDto: CreateAccessoryDto
	): Promise<AccessoryDto>;

	updateAccessoryById(
		id: number,
		updateAccessoryDto: UpdateAccessoryDto
	): Promise<AccessoryDto>;
}
