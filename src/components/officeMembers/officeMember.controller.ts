import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IOfficeMemberService } from './@types/IOfficeMemberService';
import { CreateOfficeMemberDto } from './@types/dto/CreateOfficeMember.dto';

export const OfficeMemberController = (
	officeMemberService: IOfficeMemberService
) => {
	const getOfficeMemberById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const officeMember =
				await officeMemberService.findOfficeMemberDetailById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				officeMember
			});
		}
	);

	const getOfficeMembersDetail = catchAsyncRequestHandler(
		async (req, res, next) => {
			const [officeMembers, total] =
				await officeMemberService.findOfficeMembersDetail({
					limit: 10,
					page: 10
				});

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				total,
				officeMembers
			});
		}
	);

	const deleteOfficeMember = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			await officeMemberService.deleteOfficeMemberById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success'
			});
		}
	);

	const addMemberToOffice = catchAsyncRequestHandler(
		async (req, res, next) => {
			const createOfficeMemberDto = req.body as CreateOfficeMemberDto;

			const officeMember = await officeMemberService.createOfficeMember(
				createOfficeMemberDto
			);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				officeMember
			});
		}
	);

	return {
		getOfficeMemberById,
		getOfficeMembersDetail,
		deleteOfficeMember,
		addMemberToOffice
	};
};
