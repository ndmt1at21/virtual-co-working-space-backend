import streamifier from 'streamifier';
import { ICloudUploadService } from './@types/ICloudUploadService';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IllegalArgumentError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { Readable } from 'stream';

export const CloudUploadController = (cloudService: ICloudUploadService) => {
	const uploadModel = catchAsyncRequestHandler(async (req, res, next) => {
		const uploadFile = req.file;

		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		console.log(uploadFile);

		const url = await cloudService.uploadLargeFile({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		res.status(HttpStatusCode.OK).json({
			data: { url }
		});
	});

	const uploadAvatar = catchAsyncRequestHandler(async (req, res, next) => {
		const uploadFile = req.file;

		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		const url = await cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		res.status(HttpStatusCode.OK).json({
			data: { url }
		});
	});

	const uploadImage = catchAsyncRequestHandler(async (req, res, next) => {
		const uploadFile = req.file;

		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		const url = await cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		res.status(HttpStatusCode.OK).json({
			data: { url }
		});
	});

	function createFileStream(buffer: Buffer): Readable {
		return streamifier.createReadStream(buffer);
	}

	return { uploadModel, uploadAvatar, uploadImage };
};
