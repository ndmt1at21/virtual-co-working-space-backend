import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IUserService } from './@types/IUserService';

export const UserController = (userService: IUserService) => {
	const getProfile = catchAsyncRequestHandler(async (req, res, next) => {});

	const getUserById = catchAsyncRequestHandler(async (req, res, next) => {});

	const updateUser = catchAsyncRequestHandler(async (req, res, next) => {});

	const deleteUser = catchAsyncRequestHandler(async (req, res, next) => {});

	const getUsers = catchAsyncRequestHandler(async (req, res, next) => {});

	return { getProfile, getUserById, updateUser, deleteUser, getUsers };
};
