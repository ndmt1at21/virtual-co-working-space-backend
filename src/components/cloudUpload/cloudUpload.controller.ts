import streamifier from 'streamifier';
import { ICloudUploadService } from './@types/ICloudUploadService';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IllegalArgumentError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { Readable } from 'stream';
import { ILogger } from '../logger/@types/ILogger';

export const CloudUploadController = (
	cloudService: ICloudUploadService,
	logger: ILogger
) => {
	const uploadModel = catchAsyncRequestHandler(async (req, res, next) => {
		logger.info('Upload model is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		logger.info(
			`Model information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await cloudService.uploadLargeFile({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		logger.info(`Upload model is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	const uploadAppearance = catchAsyncRequestHandler(
		async (req, res, next) => {
			logger.info('Upload appearance is starting');

			const uploadFile = req.file;
			if (!uploadFile)
				throw new IllegalArgumentError('File upload is empty');

			logger.info(
				`Appearance information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
			);

			const url = await cloudService.uploadLargeFile({
				name: uploadFile.originalname,
				stream: createFileStream(uploadFile.buffer),
				type: uploadFile.mimetype
			});

			logger.info(`Upload appearance is done`);

			res.status(HttpStatusCode.OK).json({
				code: HttpStatusCode.OK,
				data: { url }
			});
		}
	);

	const uploadAvatar = catchAsyncRequestHandler(async (req, res, next) => {
		logger.info('Upload avatar is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		logger.info(
			`Avatar information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		logger.info(`Upload avatar is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	const uploadImage = catchAsyncRequestHandler(async (req, res, next) => {
		logger.info('Upload image is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		logger.info(
			`Image information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		logger.info(`Upload image is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	function createFileStream(buffer: Buffer): Readable {
		return streamifier.createReadStream(buffer);
	}

	return { uploadModel, uploadAppearance, uploadAvatar, uploadImage };
};
