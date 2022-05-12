import streamifier from 'streamifier';
import { ICloudUploadService } from './@types/ICloudUploadService';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { IllegalArgumentError } from '@src/utils/appError';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { Readable } from 'stream';
import { ILogger } from '../logger/@types/ILogger';

export class CloudUploadController {
	constructor(
		private cloudService: ICloudUploadService,
		private logger: ILogger
	) {}

	uploadModel = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info('Upload model is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		this.logger.info(
			`Model information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await this.cloudService.uploadLargeFile({
			name: uploadFile.originalname,
			stream: this.createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		this.logger.info(`Upload model is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	uploadAppearance = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info('Upload appearance is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		this.logger.info(
			`Appearance information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await this.cloudService.uploadLargeFile({
			name: uploadFile.originalname,
			stream: this.createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		this.logger.info(`Upload appearance is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	uploadAvatar = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info('Upload avatar is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		this.logger.info(
			`Avatar information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await this.cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: this.createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		this.logger.info(`Upload avatar is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	uploadImage = catchAsyncRequestHandler(async (req, res, next) => {
		this.logger.info('Upload image is starting');

		const uploadFile = req.file;
		if (!uploadFile) throw new IllegalArgumentError('File upload is empty');

		this.logger.info(
			`Image information: size (${uploadFile.size}), mimetype (${uploadFile.mimetype}), filename (${uploadFile.filename})`
		);

		const url = await this.cloudService.uploadMedia({
			name: uploadFile.originalname,
			stream: this.createFileStream(uploadFile.buffer),
			type: uploadFile.mimetype
		});

		this.logger.info(`Upload image is done`);

		res.status(HttpStatusCode.OK).json({
			code: HttpStatusCode.OK,
			data: { url }
		});
	});

	createFileStream(buffer: Buffer): Readable {
		return streamifier.createReadStream(buffer);
	}
}
