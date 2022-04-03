import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import config from '@src/config';
import { AppError } from '@src/utils/appError';
import { v2 as cloudinary } from 'cloudinary';
import { ILogger } from '../logger/@types/ILogger';
import { FileUploadDto } from './@types/FileUpload.dto';
import { ICloudUploadService } from './@types/ICloudUploadService';

export const CloudUploadService = (logger: ILogger): ICloudUploadService => {
	const initialize = async () => {
		initializeCloudinary();
		await initializeS3();
	};

	const uploadMedia = async (file: FileUploadDto): Promise<string> => {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{},
				(err, result) => {
					if (result) {
						resolve(result.url);
					}

					if (err) {
						reject(new AppError(err.http_code, err.message));
					}
				}
			);

			file.stream.pipe(stream);
		});
	};

	const uploadLargeFile = async (file: FileUploadDto): Promise<string> => {
		const s3 = new AWS.S3();

		const params: AWS.S3.PutObjectRequest = {
			Bucket: config.cloud.MODEL_AWS_BUCKET_NAME,
			Key: v4(),
			ContentType: file.type,
			Body: file.stream,
			ACL: 'public-read',
			ContentDisposition: `attachment; filename="${file.name}"`
		};

		const result = await s3.upload(params).promise();
		return result.Location;
	};

	function initializeCloudinary(): void {
		logger.info('Start config cloudinary');

		cloudinary.config({
			cloud_name: config.cloud.IMAGE_CLOUDINARY_CLOUD_NAME,
			api_key: config.cloud.IMAGE_CLOUDINARY_API_KEY,
			api_secret: config.cloud.IMAGE_CLOUDINARY_API_SECRET
		});
	}

	async function initializeS3(): Promise<void> {
		logger.info('Start config AWS S3 service');

		AWS.config.update({
			apiVersion: '2006-03-01',
			region: config.cloud.MODEL_AWS_BUCKET_REGION,
			credentials: {
				accessKeyId: config.cloud.MODEL_AWS_BUCKET_ACCESS_KEY,
				secretAccessKey: config.cloud.MODEL_AWS_BUCKET_SECRET_KEY
			}
		});

		logger.info('Create new bucket contains file of models');
		const s3 = new AWS.S3();

		await configBucketCors(s3);
		await s3.createBucket({
			Bucket: config.cloud.MODEL_AWS_BUCKET_NAME
		});
	}

	async function configBucketCors(s3: AWS.S3): Promise<void> {
		await s3
			.putBucketCors({
				Bucket: config.cloud.MODEL_AWS_BUCKET_NAME,
				CORSConfiguration: {
					CORSRules: [
						{
							AllowedHeaders: ['*'],
							AllowedMethods: ['PUT', 'POST', 'DELETE'],
							AllowedOrigins: ['*']
						},
						{
							AllowedMethods: ['GET'],
							AllowedOrigins: ['*']
						}
					]
				}
			})
			.promise();
	}

	return { initialize, uploadMedia, uploadLargeFile };
};
