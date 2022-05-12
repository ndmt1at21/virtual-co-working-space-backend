import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import config from '@src/config';
import { AppError } from '@src/utils/appError';
import { v2 as cloudinary } from 'cloudinary';
import { ILogger } from '../logger/@types/ILogger';
import { FileUploadDto } from './@types/FileUpload.dto';
import { ICloudUploadService } from './@types/ICloudUploadService';

export class CloudUploadService implements ICloudUploadService {
	constructor(private readonly logger: ILogger) {}

	initialize = async () => {
		this.initializeCloudinary();
		await this.initializeS3();
	};

	uploadMedia = async (file: FileUploadDto): Promise<string> => {
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

	uploadLargeFile = async (
		file: FileUploadDto,
		groupCategory?: string
	): Promise<string> => {
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

	initializeCloudinary(): void {
		this.logger.info('Start config cloudinary');

		cloudinary.config({
			cloud_name: config.cloud.IMAGE_CLOUDINARY_CLOUD_NAME,
			api_key: config.cloud.IMAGE_CLOUDINARY_API_KEY,
			api_secret: config.cloud.IMAGE_CLOUDINARY_API_SECRET
		});
	}

	async initializeS3(): Promise<void> {
		this.logger.info('Start creating/updating AWS S3 bucket');

		AWS.config.update({
			apiVersion: '2006-03-01',
			region: config.cloud.MODEL_AWS_BUCKET_REGION,
			credentials: {
				accessKeyId: config.cloud.MODEL_AWS_BUCKET_ACCESS_KEY,
				secretAccessKey: config.cloud.MODEL_AWS_BUCKET_SECRET_KEY
			}
		});

		await this.createS3Bucket();

		this.logger.info('Create/Update S3 bucket contains file of models');
	}

	async createS3Bucket(): Promise<AWS.S3> {
		const s3 = new AWS.S3();

		try {
			await s3
				.createBucket({
					CreateBucketConfiguration: {
						LocationConstraint: config.cloud.MODEL_AWS_BUCKET_REGION
					},
					ACL: 'public-read',
					Bucket: config.cloud.MODEL_AWS_BUCKET_NAME
				})
				.promise();
		} catch (err: any) {
			if (err.code !== 'BucketAlreadyOwnedByYou') throw err;
		}

		await this.configBucketPolicy(s3);
		await this.configBucketCors(s3);

		return s3;
	}

	async configBucketCors(s3: AWS.S3): Promise<void> {
		await s3
			.putBucketCors({
				Bucket: config.cloud.MODEL_AWS_BUCKET_NAME,
				CORSConfiguration: {
					CORSRules: [
						{
							AllowedHeaders: ['*'],
							AllowedMethods: ['PUT', 'POST', 'DELETE', 'GET'],
							AllowedOrigins:
								config.cloud.MODEL_AWS_BUCKET_CORS_ORIGINS
						}
					]
				}
			})
			.promise();
	}

	async configBucketPolicy(s3: AWS.S3): Promise<void> {
		const bucketPolicy = {
			Version: '2012-10-17',
			Statement: {
				Sid: 'PublicS3AccessPolicy',
				Effect: 'Allow',
				Principle: '*',
				Action: ['s3:GetObject'],
				Resource: [`arn:aws:s3:::${config.cloud.MODEL_AWS_BUCKET_NAME}`]
			}
		};

		s3.putBucketPolicy({
			Bucket: config.cloud.MODEL_AWS_BUCKET_NAME,
			Policy: JSON.stringify(bucketPolicy)
		});
	}
}
