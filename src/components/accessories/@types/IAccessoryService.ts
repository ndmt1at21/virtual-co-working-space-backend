import { PaginationInfo } from '@src/components/base/@types/PaginationInfo';
import { AccessoryDto } from './dto/Accessory.dto';
import { CreateAccessoryDto } from './dto/CreateAccessory.dto';
import { UpdateAccessoryDto } from './dto/UpdateAccessory.dto';
import { FindAllAccessoriesOptions } from './filter/FindAllAccessoriesOptions';

export interface IAccessoryService {
	createAccessory(
		createAccessoryDto: CreateAccessoryDto
	): Promise<AccessoryDto>;

	updateAccessoryById(
		id: number,
		updateAccessoryDto: UpdateAccessoryDto
	): Promise<AccessoryDto>;

	findAccessoryById(id: number): Promise<AccessoryDto>;

	deleteAccessoryById(id: number): Promise<void>;

	findAccessories(
		options: FindAllAccessoriesOptions
	): Promise<[AccessoryDto[], PaginationInfo]>;
}
