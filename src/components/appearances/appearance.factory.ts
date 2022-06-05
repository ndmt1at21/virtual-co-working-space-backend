import { getCustomRepository } from 'typeorm';
import { createAuthMiddleware } from '../auth/auth.factory';
import { AppearanceRouter } from './appearance.api';
import { AppearanceController } from './appearance.controller';
import { AppearanceRepository } from './appearance.repository';
import { AppearanceReqValidation } from './appearance.reqValidation';
import { AppearanceService } from './appearance.service';

export const createAppearanceRouter = () => {
	const authMiddleware = createAuthMiddleware();
	const appearanceController = createAppearanceController();
	const appearanceReqValidation = createAppearanceReqValidation();

	return AppearanceRouter(
		authMiddleware,
		appearanceController,
		appearanceReqValidation
	);
};

export const createAppearanceController = () => {
	const appearanceService = createAppearanceService();
	return new AppearanceController(appearanceService);
};

export const createAppearanceReqValidation = () => {
	return new AppearanceReqValidation();
};

export const createAppearanceService = () => {
	const appearanceRepository = createAppearanceRepository();
	return new AppearanceService(appearanceRepository);
};

export const createAppearanceRepository = () => {
	return getCustomRepository(AppearanceRepository);
};
