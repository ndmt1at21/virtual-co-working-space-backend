import { Router } from 'express';
import {
	createCloudUploadController,
	createCloudUploadMiddleware
} from './cloudUpload.factory';

export const CloudUploadRouter = () => {
	const router = Router();
	const cloudUploadController = createCloudUploadController();
	const cloudUploadMiddleware = createCloudUploadMiddleware();

	router.post(
		'/avatar',
		cloudUploadMiddleware.avatarUpload.single('avatar'),
		cloudUploadController.uploadAvatar
	);

	router.post(
		'/image',
		cloudUploadMiddleware.imageUpload.single('image'),
		cloudUploadController.uploadImage
	);

	router.post(
		'/model',
		cloudUploadMiddleware.modelUpload.single('model'),
		cloudUploadController.uploadModel
	);

	return router;
};
