import { Router } from 'express';
import {
	createCloudUploadController,
	createCloudUploadMiddleware
} from './cloudUpload.factory';
import multer from 'multer';

export const CloudUploadRouter = () => {
	const router = Router();
	const cloudUploadController = createCloudUploadController();
	const cloudUploadMiddleware = createCloudUploadMiddleware();

	const storage = multer.memoryStorage();
	const multerUpload = multer({
		storage,
		limits: { fieldSize: 100000000000000 }
	});
	router.post(
		'/avatar',
		multerUpload.single('avatar'),
		cloudUploadController.uploadAvatar
	);

	router.post(
		'/image',
		(req, res, next) => {
			next();
		},
		cloudUploadMiddleware.imageUpload.single('image'),
		cloudUploadController.uploadImage
	);

	router.post(
		'/model',
		cloudUploadMiddleware.modelUpload.single('model'),
		cloudUploadController.uploadModel
	);

	router.post(
		'/appearance',
		cloudUploadMiddleware.modelUpload.single('appearance'),
		cloudUploadController.uploadAppearance
	);

	return router;
};
