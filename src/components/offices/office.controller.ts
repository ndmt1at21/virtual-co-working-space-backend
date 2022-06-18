import { ILogger } from '../logger/@types/ILogger';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { FindAllOfficesOptions } from './@types/filter/FindAllOfficesOptions';
import { IOfficeService } from './@types/IOfficeService';
import { generateResponseData } from '@src/utils/generateResponseData';
import { IConversationService } from '../conversations/@types/IConversationService';
import { IOfficeMemberService } from '../officeMembers/@types/IOfficeMemberService';
import { OfficeMemberErrorMessages } from '../officeMembers/officeMember.error';
import { IAppearanceService } from '../appearances/@types/IAppearanceService';
import {
	AddOfficeMemberRole,
	RemoveOfficeMemberRole
} from './@types/dto/ChangeOfficeMemberRole.dto';

export class OfficeController {
	constructor(
		private officeService: IOfficeService,
		private officeMemberService: IOfficeMemberService,
		private conversationService: IConversationService,
		private appearanceService: IAppearanceService,
		private logger: ILogger
	) {}

	getOfficeDetailById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get office detail by id ${req.params.id}`);

		const id = +req.params.id;
		const office = await this.officeService.findOfficeDetailById(id);

		this.logger.info('Get office detail successfully');

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			code: HttpStatusCode.OK,
			data: { office }
		});
	});

	updateOfficeById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Update office by id ${req.params.id}`);

		const errors = await validateRequestBody(UpdateOfficeDto, req.body);
		if (errors.length > 0) {
			this.logger.error(`Update office has error: ${errors}`);
			throw new IllegalArgumentError(
				'Invalid update office data',
				errors
			);
		}

		this.logger.info('Upload office is starting');

		const id = +req.params.id;

		const updateOfficeDto = req.body as UpdateOfficeDto;
		const office = await this.officeService.updateOfficeById(
			id,
			updateOfficeDto
		);

		this.logger.info('Update office successfully');

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			code: HttpStatusCode.OK,
			data: { office }
		});
	});

	deleteOfficeById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Delete office by id ${req.params.id}`);

		const id = +req.params.id;
		await this.officeService.deleteOfficeById(id);

		this.logger.info('Delete office successfully');

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			code: HttpStatusCode.OK
		});
	});

	blockOfficeById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Block office by id ${req.params.id}`);

		const id = +req.params.id;
		await this.officeService.changeBlockStatusOfOfficeById(id, true);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				id
			}
		});

		this.logger.info('Block office successfully');

		res.status(HttpStatusCode.OK).json(resData);
	});

	unblockOfficeById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Block office by id ${req.params.id}`);

		const id = +req.params.id;
		await this.officeService.changeBlockStatusOfOfficeById(id, false);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				id
			}
		});

		this.logger.info('Block office successfully');

		res.status(HttpStatusCode.OK).json(resData);
	});

	getOfficeItemsById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get office items by id ${req.params.id}`);

		const id = +req.params.id;
		const items = await this.officeService.findOfficeItemsById(id);

		this.logger.info('Get office items successfully');

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			data: { items }
		});
	});

	getOfficeMembersById = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(`Get office members by id ${req.params.id}`);

		const id = +req.params.id;
		const members = await this.officeService.findOfficeMembersById(id);

		this.logger.info('Get office members successfully');

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			data: { members }
		});
	});

	getConversationOfUserInOfficeByOfficeId = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Get conversation of user in office by office id ${req.params.id}`
			);

			const officeId = +req.params.id;
			const userId = +req.user!.id;

			const conversations =
				await this.conversationService.findConversationsOverviewsOfUserInOffice(
					userId,
					officeId
				);

			this.logger.info('Get conversation of user in office successfully');

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: {
					conversations
				}
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	getAllOfficesOverviewCurrentUserIsMember = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Get all offices overview current user id ${req.user?.id} is member`
			);

			const { pageable } = PaginateQueryParser.parse(req.query);

			const [offices, pagination] =
				await this.officeService.findAllOfficesOverviewUserIsMemberByUserId(
					req.user!.id,
					pageable || { page: 1, limit: 10 }
				);

			this.logger.info('Get all offices overview successfully');

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK,
				data: { pagination, offices }
			});
		}
	);

	getAllOffices = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Get all offices with query: ${JSON.stringify(req.query)}`
		);

		const query = this.extractQueryFindAllOptions(req.query);
		const [offices, pagination] =
			await this.officeService.findAllOfficesOverview(query);

		this.logger.info('Get all offices successfully');

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				offices,
				pagination
			}
		});
	});

	createOffice = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Create office with data: ${JSON.stringify(req.body)}`
		);

		const createOfficeDto = req.body as CreateOfficeDto;
		const office = await this.officeService.createOffice(
			req.user!.id,
			createOfficeDto
		);

		this.logger.info(`Create office successfully with id: ${office.id}`);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: { office }
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	removeMemberFromOffice = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Delete member from office by office id ${req.params.id} and user id ${req.params.memberId}`
			);

			const officeId = +req.params.id;
			const officeMemberId = +req.params.memberId;

			if (officeMemberId === req.user?.id) {
				throw new IllegalArgumentError(
					OfficeMemberErrorMessages.CANNOT_SELF_REMOVE
				);
			}

			await this.officeMemberService.removeOfficeMemberById(
				officeMemberId
			);

			this.logger.info('Delete member from office successfully');

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: {
					officeId,
					officeMemberId
				}
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	leaveOffice = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Leave office by [officeId = ${req.params.id}] and [userId = ${req.params.memberId}]`
		);

		const officeId = +req.params.id;
		const userId = req.user!.id;

		await this.officeMemberService.leaveOfficeByOfficeIdAndUserId(
			officeId,
			userId
		);

		this.logger.info(
			`[userId = ${req.params.memberId}] left office successfully`
		);

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				officeId,
				userId
			}
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAllAppearancesInOffice = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Get all appearances in office by office id ${req.params.id}`
			);

			const officeId = +req.params.id;

			const appearances =
				await this.appearanceService.findAllAccessoriesInOffice(
					officeId
				);

			this.logger.info('Get all appearances in office successfully');

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: {
					appearances
				}
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	addRoleToOfficeMember = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Add role to office member by [officeId = ${
				req.params.id
			}], [body =  ${JSON.stringify(req.body)}]`
		);

		const officeId = +req.params.id;
		const { officeMemberId, officeRoleId } =
			req.body as AddOfficeMemberRole;

		await this.officeMemberService.addRoleToOfficeMember(
			officeMemberId,
			officeRoleId
		);

		this.logger.info('Add role to office member successfully');

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				officeId,
				officeMemberId,
				officeRoleId
			}
		});

		res.status(HttpStatusCode.OK).json(resData);
	});

	getAllOfficeRoles = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info(
			`Get all exists office member roles by [officeId = ${req.params.id}]`
		);

		const allRoles = await this.officeService.findAllOfficeRoles();

		const resData = generateResponseData({
			code: HttpStatusCode.OK,
			data: {
				roles: allRoles
			}
		});

		this.logger.info('Get all exists office member roles successfully');

		res.status(HttpStatusCode.OK).json(resData);
	});

	removeRoleFromOfficeMember = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Remove role from office member by [officeId = ${
					req.params.id
				}], [body =  ${JSON.stringify(req.body)}]`
			);

			const officeId = +req.params.id;
			const { officeMemberId, officeRoleId } =
				req.body as RemoveOfficeMemberRole;

			await this.officeMemberService.removeRoleFromOfficeMember(
				officeMemberId,
				officeRoleId
			);

			this.logger.info('Remove role from office member successfully');

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: {
					officeId,
					officeMemberId,
					officeRoleId
				}
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	extractQueryFindAllOptions(originalQuery: any): FindAllOfficesOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: {
				includes: [
					'name',
					'invitation_code',
					'created_by',
					'office_item',
					'office_member',
					'created_at'
				]
			}
		});

		const options: FindAllOfficesOptions = {};

		if (query.filter) {
			const queryFilter = query.filter;

			options.filter = {
				name: queryFilter?.name,
				invitationCode: queryFilter?.invitation_code,
				createdBy: queryFilter?.created_by,
				officeItem: queryFilter?.office_item,
				officeMember: queryFilter?.office_member,
				createdAt: queryFilter?.created_at,
				deleted: queryFilter?.deleted,
				blocked: queryFilter?.blocked
			};
		}

		if (query.sort) {
			const querySort = query.sort;

			options.sort = {
				name: querySort?.name?.order,
				invitationCode: querySort?.invitation_code?.order,
				createdBy: querySort?.created_by?.order,
				officeItem: querySort?.office_item?.order,
				officeMember: querySort?.office_member?.order,
				createdAt: querySort?.created_at?.order
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}
}
