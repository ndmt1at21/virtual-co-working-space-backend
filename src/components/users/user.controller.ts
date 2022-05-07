import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { PaginateQueryParser } from '@src/utils/paginateQueryParser';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdateUserDto } from './@types/dto/UpdateUser.dto';
import { FindAllUsersOptions } from './@types/filter/FindAllUsersOptions';
import { IUserService } from './@types/IUserService';
import { UserStatus } from './@types/UserStatus';
import { UserErrorMessage } from './user.error';

export const UserController = (userService: IUserService) => {
	const createUser = catchAsyncRequestHandler(async (req, res, next) => {
		const errors = await validateRequestBody(CreateUserDto, req.body);
		if (errors.length > 0) {
			throw new IllegalArgumentError('Invalid user data', errors);
		}

		const createUserDto = req.body as CreateUserDto;
		const user = await userService.createLocalUser(createUserDto);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User created successfully',
			data: { user }
		});
	});

	const getProfile = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.user!.id;
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { user }
		});
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

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { user: updatedUser }
		});
	});

	const getUserById = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { user }
		});
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

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { user: updatedUser }
		});
	});

	const blockUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;

		if (userId === req.user!.id) {
			throw new IllegalArgumentError(
				UserErrorMessage.USER_CANNOT_BLOCK_SELF
			);
		}

		const id = await userService.updateUserBlockStatus(
			userId,
			UserStatus.BLOCKED
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User blocked successfully',
			data: {
				id
			}
		});
	});

	const unblockUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = +req.params.id;

		if (userId === req.user!.id) {
			throw new IllegalArgumentError(
				UserErrorMessage.USER_CANNOT_UNBLOCK_SELF
			);
		}

		// TODO: If user status before blocking is inactive??? -> move confirm status to another column
		const id = await userService.updateUserBlockStatus(
			userId,
			UserStatus.ACTIVE
		);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			message: 'User unblocked successfully',
			data: {
				id
			}
		});
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

		const [users, pagination] = await userService.findAllUsers(query);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: {
				users,
				pagination
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
		blockUser,
		unblockUser,
		deleteUser,
		getUsers
	};
};
