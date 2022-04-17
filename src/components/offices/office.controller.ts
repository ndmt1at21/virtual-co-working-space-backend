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
			filter: { includes: ['name', 'path'] }
		});

		const filter: FindAllOfficesFilter = {};
		const sort: FindAllOfficesSort = {};

		if (query.filter) {
			filter.name = query.filter?.name;
			filter.invitationCode = query.filter?.invitation_code;
			filter.createdBy = query.filter?.created_by;
			filter.officeItem = query.filter?.office_item;
			filter.officeMember = query.filter?.office_member;
			filter.createdAt = query.filter?.created_at;
		}

		if (query.sort) {
			sort.name = query.sort?.name.order;
			sort.invitationCode = query.sort?.invitation_code?.order;
			sort.createdBy = query.sort?.created_by?.order;
			sort.officeItem = query.sort?.office_item?.order;
			sort.officeMember = query.sort?.office_member?.order;
			sort.createdAt = query.sort?.created_at?.order;
		}

		return {
			filter,
			sort,
			pageable: query.pageable
		};
	}

	return {
		getOfficeDetailById,
		updateOfficeById,
		deleteOfficeById,
		getOfficeItemsById,
		getOfficeMembersById,
		getAllOfficesOverviewCurrentUserIsMember,
		createOffice
	};
};
