import { getCustomRepository } from 'typeorm';
import { OfficeItemRepository } from './officeItem.repository';

export const createOfficeItemRepository = () => {
	return getCustomRepository(OfficeItemRepository);
};
