import { getCustomRepository } from 'typeorm';
import { AccessoryController } from './accessory.controller';
import { AccessoryRepository } from './accessory.repository';
import { AccessoryReqValidation } from './accessory.reqValidation';
import { AccessoryService } from './accessory.service';

export const createAccessoryController = () => {
	const accessoryService = createAccessoryService();
	return AccessoryController(accessoryService);
};

export const createAccessoryReqValidation = () => {
	return AccessoryReqValidation();
};

export const createAccessoryService = () => {
	const accessoryRepository = createAccessoryRepository();
	return AccessoryService(accessoryRepository);
};

export const createAccessoryRepository = () => {
	return getCustomRepository(AccessoryRepository);
};
