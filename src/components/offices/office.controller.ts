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

export class OfficeController {
	constructor(
		private officeService: IOfficeService,
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

	getAllOfficesOverviewCurrentUserIsMember = catchAsyncRequestHandler(
		async (req, res, next) => {
			this.logger.info(
				`Get all offices overview current user id ${req.user?.id} is member`
			);

			const [offices, total] =
				await this.officeService.findAllOfficesOverviewUserIsMemberByUserId(
					req.user!.id,
					{ limit: 10, page: 10 }
				);

			this.logger.info('Get all offices overview successfully');

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK,
				data: { total, offices }
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
		this.logger.info('Create office is starting');

		const errors = await validateRequestBody(CreateOfficeDto, req.body);
		if (errors.length > 0)
			throw new IllegalArgumentError('Invalid request body', errors);

		this.logger.info(
			`Create office with data: ${JSON.stringify(req.body)}`
		);

		const createOfficeDto = req.body as CreateOfficeDto;
		const office = await this.officeService.createOffice(
			req.user!.id,
			createOfficeDto
		);

		this.logger.info('Create office successfully with id: ', office.id);

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			code: HttpStatusCode.OK,
			data: { office }
		});
	});

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
