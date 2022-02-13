import { Router } from 'express';
import authApi from './auth.api';

const router = Router();
router.use('/', authApi);
