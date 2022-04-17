import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdateUserDto } from './@types/dto/UpdateUser.dto';
import { FindAllUsersOptions } from './@types/filter/FindAllUsersOptions';
import { IUserService } from './@types/IUserService';

export const UserController = (userService: IUserService) => {
	const createUser = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(CreateUserDto, req.body);
		if (errors.length > 0) {
			throw new IllegalArgumentError('Invalid user data', errors);
		}

		const createUserDto = req.body as CreateUserDto;
		const user = await userService.createLocalUser(createUserDto);

		res.status(HttpStatusCode.CREATED).json({
			message: 'User created successfully',
			user
		});
	});

	const getProfile = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.user!.id;
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json(user);
	});

	const updateProfile = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.user!.id;

		const errors = await validateRequestBody(UpdateUserDto, req.body);
		if (errors.length > 0)
			throw new IllegalArgumentError('Invalid update user data', errors);

		const updateUserDto = req.body as UpdateUserDto;
		const updatedUser = await userService.updateUserById(
			userId,
			updateUserDto
		);

		res.status(HttpStatusCode.OK).json(updatedUser);
	});

	const getUserById = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json(user);
	});

	const updateUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;

		const errors = await validateRequestBody(UpdateUserDto, req.body);
		if (errors.length > 0)
			throw new IllegalArgumentError('Invalid update user data', errors);

		const updateUserDto = req.body as UpdateUserDto;
		const updatedUser = await userService.updateUserById(
			userId,
			updateUserDto
		);

		res.status(HttpStatusCode.OK).json(updatedUser);
	});

	const deleteUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;
		await userService.deleteUserById(userId);
		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User deleted successfully'
		});
	});

	const getUsers = catchAsyncRequestHandler(async (req, res, next) => {
		const query = extractQueryFindAllOptions(req.query);

		const users = await userService.findAllUsers(query);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				users
			}
		});
	});

	function extractQueryFindAllOptions(
		originalQuery: any
	): FindAllUsersOptions {
		const query = PaginateQueryParser.parse(originalQuery, {
			filter: {
				includes: [
					'name',
					'email',
					'phone',
					'provider',
					'blocked',
					'status',
					'type'
				]
			}
		});

		const options: FindAllUsersOptions = {};

		if (query.filter) {
			options.filter = {
				name: query.filter?.name,
				email: query.filter?.email,
				phone: query.filter?.phone,
				provider: query.filter?.provider,
				blocked: query.filter?.blocked,
				status: query.filter?.status,
				type: query.filter?.type
			};
		}

		if (query.sort) {
			options.sort = {
				name: query.sort?.name?.order,
				email: query.sort?.email?.order,
				phone: query.sort?.phone?.order,
				provider: query.sort?.provider?.order,
				status: query.sort?.status?.order,
				type: query.sort?.type?.order,
				createdAt: query.sort?.created_at?.order || 'DESC'
			};
		}

		if (query.pageable) {
			options.pageable = query.pageable;
		}

		return options;
	}

	return {
		createUser,
		getProfile,
		updateProfile,
		getUserById,
		updateUser,
		deleteUser,
		getUsers
	};
};
