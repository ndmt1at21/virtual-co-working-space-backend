import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { CreateAccessoryCategoryDto } from './@types/dto/CreateAccessoryCategory.dto';
import { UpdateAccessoryCategoryDto } from './@types/dto/UpdateAccessoryCategory.dto';
import { IAccessoryCategoryService } from './@types/IAccessoryCategoryService';

export const AccessoryCategoryController = (
	accessoryCategoryService: IAccessoryCategoryService
) => {
	const createAccessoryCategory = catchAsyncRequestHandler(
		async (req, res, next) => {
			const createDto = req.body as CreateAccessoryCategoryDto;
			const createdAccessoryCategory =
				await accessoryCategoryService.create({
					...createDto,
					creatorId: req.user!.id
				});

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { accessoryCategory: createdAccessoryCategory }
			});
		}
	);

	const updateAccessoryCategory = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;
			const updateDto = req.body as UpdateAccessoryCategoryDto;

			const updatedAccessoryCategory =
				await accessoryCategoryService.updateAccessoryCategoryById(
					id,
					updateDto
				);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { accessoryCategory: updatedAccessoryCategory }
			});
		}
	);

	const getAccessoryCategoryById = catchAsyncRequestHandler(
		async (req, res, next) => {
			const id = +req.params.id;

			const accessoryCategory =
				await accessoryCategoryService.findAccessoryCategoryById(id);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { accessoryCategory }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);

	const getAllAccessoryCategories = catchAsyncRequestHandler(
		async (req, res, next) => {
			const { pageable } = PaginateQueryParser.parse(req.query);

			const [accessoryCategories, paginationInfo] =
				await accessoryCategoryService.findAllAccessoryCategories(
					pageable
				);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: {
					accessoryCategories: accessoryCategories,
					pagination: paginationInfo
				}
			});
		}
	);

	return {
		createAccessoryCategory,
		updateAccessoryCategory,
		getAccessoryCategoryById,
		getAllAccessoryCategories
	};
};
