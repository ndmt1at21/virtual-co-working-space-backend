import events from 'events';

const eventEmitter = new events.EventEmitter();

eventEmitter.addListener('user registered', user => {});

eventEmitter.addListener('reset password', user => {});
