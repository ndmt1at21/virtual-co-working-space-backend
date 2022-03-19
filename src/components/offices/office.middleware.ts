import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IOfficeMiddleware } from './@types/IOfficeMiddleware';
import { OfficeRoleType } from '@components/officeRoles/@types/OfficeRoleType';
import { OfficeMemberErrorMessages } from '@components/officeMembers/officeMember.error';
import { OfficeMemberRepository } from '@components/officeMembers/officeMember.repository';

export const OfficeMiddleware = (
	officeMemberRepository: OfficeMemberRepository
): IOfficeMiddleware => {
	const deserializeOfficeFromParams = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const officeId = req.params.id;
		const userId = req.user!.id;

		if (!officeId || !userId) {
			next();
			return;
		}

		try {
			const officeMember = await officeMemberRepository
				.queryBuilder()
				.findByMemberIdAndOfficeId(userId, officeId)
				.withRoles()
				.build()
				.getOne();

			if (officeMember) {
				req.office = {
					id: officeId,
					createdBy: userId,
					role: officeMember.roles.map(role => role.officeRole.name)
				};
			}
		} catch (err) {}

		next();
	};

	const restrictTo = (requiredRoles: OfficeRoleType[]): RequestHandler => {
		return (req: Request, res: Response, next: NextFunction) => {
			const hasPermission = requiredRoles.some(role =>
				req.office?.role?.includes(role)
			);

			if (hasPermission) {
				next();
			}

			if (!hasPermission) {
				next(OfficeMemberErrorMessages.PERMISSION_DENIED);
			}
		};
	};

	return { deserializeOfficeFromParams, restrictTo };
};
