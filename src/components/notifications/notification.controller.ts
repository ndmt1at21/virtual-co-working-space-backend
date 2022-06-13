import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { generateResponseData } from '@src/utils/generateResponseData';
import { createPushNotificationService } from '../pushNotification/pushNotification.factory';
import { PushNotificationService } from '../pushNotification/pushNotification.service';
import { CreateNotificationDto } from './@types/CreateNotification.dto';
import { NotificationService } from './notification.service';

export class NotificationController {
	private readonly pushNotificationService = createPushNotificationService();

	constructor(private readonly notificationService: NotificationService) {}

	createNotification = catchAsyncRequestHandler(async (req, res, next) => {
		const data = req.body as CreateNotificationDto;

		const notification = await this.notificationService.createNotification(
			data
		);

		const resData = generateResponseData({
			code: HttpStatusCode.CREATED,
			data: { notification }
		});

		data.notifierIds.map(userId => {
			this.pushNotificationService.pushNotification(userId, {
				title: 'New Notification',
				body: `${data.actorId} sent you a notification`,
				data: {
					type: 'notification',
					id: notification.id
				}
			});
		});

		res.status(HttpStatusCode.CREATED).json(resData);
	});

	getNotificationsOfUser = catchAsyncRequestHandler(
		async (req, res, next) => {
			const userId = req.user!.id;

			const notifications =
				await this.notificationService.findNotificationsByUserId(
					userId
				);

			const resData = generateResponseData({
				code: HttpStatusCode.OK,
				data: { notifications }
			});

			res.status(HttpStatusCode.OK).json(resData);
		}
	);
}
