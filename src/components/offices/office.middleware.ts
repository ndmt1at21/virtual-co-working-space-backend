import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IOfficeMiddleware } from './@types/IOfficeMiddleware';
import { OfficeRoleType } from '@components/officeRoles/@types/OfficeRoleType';
import { OfficeMemberErrorMessages } from '@components/officeMembers/officeMember.error';
import { OfficeMemberRepository } from '@components/officeMembers/officeMember.repository';
import {
	IllegalArgumentError,
	NotFoundError,
	UnauthorizedError
} from '@src/utils/appError';
import { OfficeRepository } from './office.repository';
import { OfficeErrorMessages } from './office.error';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';

export class OfficeMiddleware implements IOfficeMiddleware {
	constructor(
		private readonly officeMemberRepository: OfficeMemberRepository,
		private readonly officeRepository: OfficeRepository
	) {}

	protect = catchAsyncRequestHandler(async (req, res, next) => {
		const officeId = +req.params.id;
		const userId = req.user!.id;

		if (!officeId || !userId) {
			throw new IllegalArgumentError(
				OfficeErrorMessages.INVALID_OFFICE_ID
			);
		}

		const { office, officeMember } = await this.deserializeOfficeFromParams(
			officeId,
			userId
		);

		req.office = {
			id: officeId,
			isBlocked: office.isBlocked,
			createdBy: userId,
			roles: officeMember.roles.map(role => role.officeRole.name)
		};

		next();
	});

	restrictToNotBlockedOffice = catchAsyncRequestHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			if (req.office?.isBlocked) {
				throw new UnauthorizedError(OfficeErrorMessages.OFFICE_BLOCKED);
			}

			next();
		}
	);

	restrictTo = (requiredRoles: OfficeRoleType[]): RequestHandler => {
		return (req: Request, res: Response, next: NextFunction) => {
			const hasPermission = requiredRoles.some(role =>
				req.office?.roles?.includes(role)
			);

			if (hasPermission) {
				next();
			}

			if (!hasPermission) {
				next(
					new UnauthorizedError(
						OfficeMemberErrorMessages.PERMISSION_DENIED
					)
				);
			}
		};
	};

	async deserializeOfficeFromParams(officeId: number, userId: number) {
		const office = await this.officeRepository.findById(officeId);

		if (!office) {
			throw new NotFoundError(OfficeErrorMessages.OFFICE_NOT_FOUND);
		}

		const officeMember = await this.officeMemberRepository
			.queryBuilder()
			.findByMemberIdAndOfficeId(userId, officeId)
			.withRoles()
			.build()
			.getOne();

		if (!officeMember) {
			throw new UnauthorizedError(
				OfficeMemberErrorMessages.USER_IS_NOT_OFFICE_MEMBER
			);
		}

		return { office, officeMember };
	}
}
