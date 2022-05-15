import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreatePrivateInvitationDto } from './@types/dto/CreatePrivateInvitation.dto';
import { IOfficeInvitationReqValidation } from './@types/IOfficeInvitationReqValidation';

export class OfficeInvitationReqValidation
	implements IOfficeInvitationReqValidation
{
	validateCreatePrivateOfficeInvitation = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(
				CreatePrivateInvitationDto,
				req.body
			);

			if (errors.length > 0) {
				throw new IllegalArgumentError(
					'Invalid invitation data',
					errors
				);
			}

			next();
		}
	);
}
