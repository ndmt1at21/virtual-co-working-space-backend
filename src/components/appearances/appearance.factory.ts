import { getCustomRepository } from 'typeorm';
import { AppearanceController } from './appearance.controller';
import { AppearanceRepository } from './appearance.repository';
import { AppearanceReqValidation } from './appearance.reqValidation';
import { AppearanceService } from './appearance.service';

export const createAppearanceController = () => {
	const appearanceService = createAppearanceService();
	return new AppearanceController(appearanceService);
};

export const createAppearanceReqValidation = () => {
	return AppearanceReqValidation();
};

export const createAppearanceService = () => {
	const appearanceRepository = createAppearanceRepository();
	return new AppearanceService(appearanceRepository);
};

export const createAppearanceRepository = () => {
	return getCustomRepository(AppearanceRepository);
};
