import config from '@src/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { docs } from './docs';

const isDev = config.app.NODE_ENV === 'development';

if (isDev) {
	const app = express();

	app.use('/', swaggerUI.serve, swaggerUI.setup(docs, {}));

	app.listen(8001, () => {
		console.log('Server is listening on port 8001');
	});
}
