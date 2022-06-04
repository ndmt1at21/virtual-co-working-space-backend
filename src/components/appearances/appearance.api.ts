import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import {
	createAppearanceController,
	createAppearanceReqValidation
} from './appearance.factory';

export const AppearanceRouter = (): Router => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const appearanceController = createAppearanceController();
	const reqValidation = createAppearanceReqValidation();

	router.use(authMiddleware.protect);

	router
		.route('/')
		.post(
			reqValidation.validateCreateAppearance,
			appearanceController.createAppearance
		)
		.get(appearanceController.getAllAccessoriesOfUser);

	return router;
};
