import { socketMiddleware } from '@src/utils/socketMiddleware';
import { Server, Socket } from 'socket.io';
import { OfficeMemberSocketData } from '../officeMembers/@types/socket/OfficeMemberSocketData';
import { OfficeItemClientToServerEvent } from './@types/OfficeItemClientToServerEvent';
import { OfficeItemServerToClientEvent } from './@types/OfficeItemServerToClientEvent';
import { createOfficeItemSocketController } from './officeItem.factory';

export const OfficeItemSocketHandler = () => {
	const officeItemSocketController = createOfficeItemSocketController();
	const handleError = officeItemSocketController.handleError;

	const listen = (
		io: Server,
		socket: Socket<
			OfficeItemClientToServerEvent,
			OfficeItemServerToClientEvent,
			any,
			OfficeMemberSocketData
		>
	) => {
		socket.on('office_item:create', data => {
			const fn = socketMiddleware(
				officeItemSocketController.onOfficeItemCreate
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('office_item:move', data => {
			const fn = socketMiddleware(
				officeItemSocketController.onOfficeItemMove
			);

			fn.use(handleError);
			fn.execute(io, socket, { body: data });
		});

		socket.on('office_item:delete', data => {
			const fn = socketMiddleware(
				officeItemSocketController.onOfficeItemDelete
			);

			fn.use(handleError);
			fn.execute(io, socket, {
				body: { id: data.id }
			});
		});
	};

	return { listen };
};
