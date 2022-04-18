import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import {
	FindAllOfficesFilter,
	FindAllOfficesOptions,
	FindAllOfficesSort
} from './@types/filter/FindAllOfficesOptions';
import { IOfficeService } from './@types/IOfficeService';

export const OfficeController = (officeService: IOfficeService) => {
	const getOfficeDetailById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;
			const office = await officeService.findOfficeDetailById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK,
				office
			});
		}
	);

	const updateOfficeById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const errors = await validateRequestBody(UpdateOfficeDto, req.body);
			if (errors.length > 0) {
				throw new IllegalArgumentError(
					'Invalid update office data',
					errors
				);
			}

			const id = +req.params.id;

			const updateOfficeDto = req.body as UpdateOfficeDto;
			const office = await officeService.updateOfficeById(
				id,
				updateOfficeDto
			);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK,
				office
			});
		}
	);

	const deleteOfficeById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			await officeService.deleteOfficeById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK
			});
		}
	);

	const getOfficeItemsById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const items = await officeService.findOfficeItemsById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				data: items
			});
		}
	);

	const getOfficeMembersById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const members = await officeService.findOfficeMembersById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				data: members
			});
		}
	);

	const getAllOfficesOverviewCurrentUserIsMember = catchAsyncRequestHandler(
		async (req, res, next) => {
			const [offices, total] =
				await officeService.findAllOfficesOverviewUserIsMemberByUserId(
					req.user!.id,
					{ limit: 10, page: 10 }
				);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				code: HttpStatusCode.OK,
				total,
				offices
			});
		}
	);

	const getAllOffices = catchAsyncRequestHandler(async (req, res, next) => {
		const query = extractQueryFindAllOptions(req.query);
		const [offices, pagination] =
			await officeService.findAllOfficesOverview(query);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				offices,
				pagination
			}
		});
	});

	const createOffice = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(CreateOfficeDto, req.body);
		if (errors.length > 0)
			throw new IllegalArgumentError('Invalid request body', errors);

		const createOfficeDto = req.body as CreateOfficeDto;
		const office = await officeService.createOffice(
			req.user!.id,
			createOfficeDto
		);

		res.status(HttpStatusCode.OK).json({
			status: 'success',
			code: HttpStatusCode.OK,
			office
		});
	});

	function extractQueryFindAllOptions(
		originalQuery: any
	): FindAllOfficesOptions {
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
				createdAt: queryFilter?.created_at
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

	return {
		getOfficeDetailById,
		getOfficeItemsById,
		getOfficeMembersById,
		getAllOfficesOverviewCurrentUserIsMember,
		getAllOffices,
		updateOfficeById,
		deleteOfficeById,
		createOffice
	};
};
