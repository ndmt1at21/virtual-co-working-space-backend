import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IOfficeMemberService } from './@types/IOfficeMemberService';
import { CreateOfficeMemberDto } from './@types/dto/CreateOfficeMember.dto';

export class OfficeMemberController {
	constructor(private readonly officeMemberService: IOfficeMemberService) {}

	getOfficeMemberById = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		const officeMember =
			await this.officeMemberService.findOfficeMemberDetailById(id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { officeMember }
		});
	});

	getOfficeMembersDetail = catchAsyncRequestHandler(
		async (req, res, next) => {
			const [officeMembers, total] =
				await this.officeMemberService.findOfficeMembersDetail({
					limit: 10,
					page: 10
				});

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: {
					total,
					officeMembers
				}
			});
		}
	);

	deleteOfficeMember = catchAsyncRequestHandler(async (req, res, next) => {
		const id = +req.params.id;

		await this.officeMemberService.deleteOfficeMemberById(id);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK
		});
	});

	addMemberToOffice = catchAsyncRequestHandler(async (req, res, next) => {
		const createOfficeMemberDto = req.body as CreateOfficeMemberDto;

		const officeMember = await this.officeMemberService.createOfficeMember(
			createOfficeMemberDto
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { officeMember }
		});
	});
}
