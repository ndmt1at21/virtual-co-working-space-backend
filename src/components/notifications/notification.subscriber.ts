import EventEmitter from 'events';
import { NotificationContract } from './@types/NotitifactionContract';

const eventEmitter = new EventEmitter();

eventEmitter.on('new_notification', (contract: NotificationContract) => {});
