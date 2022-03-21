import { pageParser } from '@src/utils/pageParser';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateOfficeDto } from './@types/dto/CreateOffice.dto';
import { UpdateOfficeDto } from './@types/dto/UpdateOffice.dto';
import { IOfficeService } from './@types/IOfficeService';

export const OfficeController = (officeService: IOfficeService) => {
	const getOfficeDetailById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;
			const office = await officeService.findOfficeDetailById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
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
				office
			});
		}
	);

	const deleteOfficeById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			await officeService.deleteOfficeById(id);

			res.status(HttpStatusCode.OK).json({
				status: 'success'
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
			const pageable = pageParser(req.query, {
				defaultPage: 1,
				defaultSize: 10
			});

			const [offices, total] =
				await officeService.findAllOfficesOverviewUserIsMemberByUserId(
					req.user!.id,
					pageable
				);

			res.status(HttpStatusCode.OK).json({
				status: 'success',
				page: pageable.page,
				limit: pageable.size,
				total,
				offices
			});
		}
	);

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
			office
		});
	});

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
