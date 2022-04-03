import { IllegalArgumentError } from '@src/utils/appError';
import { Request } from 'express';
import multer from 'multer';
import { ICloudUploadMiddleware } from './@types/ICloudUploadMiddleware';

export const CloudUploadMiddleware = (): ICloudUploadMiddleware => {
	const avatarUpload = multer({
		limits: { files: 1, fileSize: 20 * 1024 * 1024 },
		fileFilter: imageFilter
	});

	const imageUpload = multer({
		limits: { files: 1, fileSize: 20 * 1024 * 1024 },
		fileFilter: imageFilter
	});

	const modelUpload = multer({
		limits: {
			files: 1
		},
		fileFilter: modelFilter
	});

	function imageFilter(
		req: Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	) {
		if (file.mimetype.split('/')[0] === 'image') {
			cb(null, true);
		} else {
			cb(new IllegalArgumentError('Only image files are allowed'));
		}
	}

	function modelFilter(
		req: Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	) {
		if (file.mimetype.split('/')[1]?.includes('gltf')) {
			cb(null, true);
		} else {
			cb(new IllegalArgumentError('Only gltf file type is allowed'));
		}
	}

	return { avatarUpload, imageUpload, modelUpload };
};
