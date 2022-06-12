import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';
import { createOfficeMemberController } from './officeMember.factory';

export const OfficeMemberRouter = () => {
	const router = Router();
	const authMiddleware = createAuthMiddleware();
	const officeMemberController = createOfficeMemberController();

	router.use(authMiddleware.protect);

	router
		.route('/:id')
		.get(officeMemberController.getOfficeMemberById)
		.delete(officeMemberController.removeOfficeMember);

	router
		.route('/')
		.get(officeMemberController.getOfficeMembersDetail)
		.post(officeMemberController.addMemberToOffice);

	return router;
};
