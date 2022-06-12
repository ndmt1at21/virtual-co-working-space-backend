import { createAuthMiddleware } from '@src/components/auth/auth.factory';
import { createOfficeMemberController } from '@src/components/officeMembers/officeMember.factory';
import { Router } from 'express';

export const OfficeMemberRouter = () => {
	const router = Router();
	const officeMemberController = createOfficeMemberController();

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
