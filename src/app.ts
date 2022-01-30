import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(
	cors({
		origin: '*',
		credentials: true,
		exposedHeaders: ['x-total-count']
	})
);

export default app;
