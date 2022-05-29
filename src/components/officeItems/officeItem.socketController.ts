import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { SocketMiddlewareErrorFunction } from '@src/utils/@types/socketMiddleware';
import { AppError } from '@src/utils/appError';
import { catchAsyncSocketHandler } from '@src/utils/catchAsyncSocketHandler';
import { Socket } from 'socket.io';
import { ILogger } from '../logger/@types/ILogger';
import { OfficeMemberSocketData } from '../officeMembers/@types/socket/OfficeMemberSocketData';
import { CreateOfficeItemDto } from './@types/dto/CreateOfficeItem.dto';
import { UpdateOfficeItemTransformDto } from './@types/dto/UpdateOfficeItemTransform.dto';
import { IOfficeItemService } from './@types/IOfficeItemService';
import { OfficeItemClientToServerEvent } from './@types/OfficeItemClientToServerEvent';
import { OfficeItemServerToClientEvent } from './@types/OfficeItemServerToClientEvent';

export type OfficeItemSocket = Socket<
	OfficeItemClientToServerEvent,
	OfficeItemServerToClientEvent,
	any,
	OfficeMemberSocketData
>;

export class OfficeItemSocketController {
	constructor(
		private readonly officeItemService: IOfficeItemService,
		private readonly logger: ILogger
	) {}

	onOfficeItemCreate = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`Start creating office item for office ${
					context.data.officeId
				} with data: ${JSON.stringify(context.data)}`
			);

			const { itemId, officeId, ...transform } =
				context.body as CreateOfficeItemDto;

			const officeItem = await this.officeItemService.createOfficeItem({
				itemId,
				officeId,
				...transform
			});

			this.logger.info(
				`Finished creating office item [id = ${officeItem.id}] for office ${context.data.officeId}`
			);

			this.logger.info(
				`Start emitting event 'office_item:created' to room ${context.data.officeId}`
			);

			io.in(`${socket.data.officeMember!.officeId}`).emit(
				'office_item:created',
				officeItem
			);

			this.logger.info(
				`Finished emitting event 'office_item:created' to room ${context.data.officeId}`
			);
		}
	);

	onOfficeItemMove = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`Start moving office item in office ${
					context.data.officeId
				} with data: ${JSON.stringify(context.data)}`
			);

			const { id, transform } =
				context.body as UpdateOfficeItemTransformDto;

			this.logger.info(
				`Start emitting event 'office_item:moved' to room: ${context.data.officeId}`
			);

			socket
				.to(`${socket.data.officeMember!.officeId}`)
				.emit('office_item:moved', {
					id,
					transform
				});

			this.logger.info(
				`Finished emitting event 'office_item:moved' to room: ${context.data.officeId}`
			);

			await this.officeItemService.updateOfficeItemTransform(
				id,
				transform
			);

			this.logger.info(
				`Finished moving office item in office ${context.data.officeId}`
			);
		}
	);

	onOfficeItemDelete = catchAsyncSocketHandler(
		async (io, socket, context, next) => {
			this.logger.info(
				`Start deleting office item in office ${
					context.data.officeId
				} with data: ${JSON.stringify(context.data)}`
			);

			const id = context.body.id as number;
			const officeId = socket.data.officeMember!.officeId;
			await this.officeItemService.deleteOfficeItem(id);

			this.logger.info(
				`Finished deleting office item in office ${officeId}`
			);

			this.logger.info(
				`Start emitting event 'office_item:deleted' to room: ${officeId}`
			);

			socket.to(`${officeId}`).emit('office_item:deleted', id);

			this.logger.info(
				`Finished emitting event 'office_item:deleted' to room: ${officeId}`
			);
		}
	);

	handleError: SocketMiddlewareErrorFunction = (
		err,
		io,
		socket,
		context,
		next
	) => {
		if (err instanceof AppError) {
			this.logger.info(err.message);

			socket.emit('office_item:error', {
				code: err.statusCode,
				message: err.message,
				errors: err.errors
			});

			return;
		}

		this.logger.error(`${err.message}`);
		this.logger.error(`${err.stack}`);

		socket.emit('office_item:error', {
			code: HttpStatusCode.INTERNAL_SERVER_ERROR,
			message: 'Something went wrong'
		});
	};
}
