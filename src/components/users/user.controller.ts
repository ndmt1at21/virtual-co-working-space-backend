import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { IllegalArgumentError } from '@src/utils/appError';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { validateRequestBody } from '@src/utils/requestValidation';
import { CreateUserDto } from './@types/dto/CreateUser.dto';
import { UpdateUserDto } from './@types/dto/UpdateUser.dto';
import { IUserService } from './@types/IUserService';

export const UserController = (userService: IUserService) => {
	const createUser = catchAsyncRequestHandler(async (req, res, next) => {
		const err = await validateRequestBody(CreateUserDto, req.body);
		if (err) {
			throw new IllegalArgumentError(err);
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
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json(user);
	});

	const getUserById = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.params.id;
		const user = await userService.findUserById(userId);
		res.status(HttpStatusCode.OK).json(user);
	});

	const updateUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.params.id;

		const err = validateRequestBody(UpdateUserDto, req.body);
		if (err) throw err;

		const updateUserDto = req.body as UpdateUserDto;
		const updatedUser = await userService.updateUserById(
			userId,
			updateUserDto
		);

		res.status(HttpStatusCode.OK).json(updatedUser);
	});

	const deleteUser = catchAsyncRequestHandler(async (req, res, next) => {
		const userId = req.params.id;
		await userService.deleteUserById(userId);
		res.status(HttpStatusCode.OK).json({
			message: 'User deleted successfully'
		});
	});

	const getUsers = catchAsyncRequestHandler(async (req, res, next) => {});

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
