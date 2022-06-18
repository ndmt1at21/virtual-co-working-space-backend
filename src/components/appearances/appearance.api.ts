import { Router } from 'express';
import { IAuthMiddleware } from '../auth/@types/IAuthMiddleware';
import { IAppearanceController } from './@types/IAppearanceController';
import { IAppearanceValidation } from './@types/IAppearanceReqValidation';

export const AppearanceRouter = (
	authMiddleware: IAuthMiddleware,
	appearanceController: IAppearanceController,
	appearanceReqValidation: IAppearanceValidation
): Router => {
	const router = Router();

	router.use(authMiddleware.protect);

	router
		.route('/')
		.post(
			appearanceReqValidation.validateCreateAppearance,
			appearanceController.createAppearance
		)
		.get(appearanceController.getAllAppearancesOfUser);

	return router;
};
