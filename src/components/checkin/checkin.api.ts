import { checkinLogger } from './../logger/index';
import { CheckInRepository } from './checkin.repository';
import { getCustomRepository } from 'typeorm';
import { CheckInService } from './checkin.service';
import { CheckInController } from './checkin.controller';
import { Router } from 'express';
import { createAuthMiddleware } from '../auth/auth.factory';

export const CheckInRouter = (): Router => {
    const router = Router();
    const checkInService = CheckInService(getCustomRepository(CheckInRepository));
    const authMiddleware = createAuthMiddleware();
    const checkinController = CheckInController(checkInService, checkinLogger);

    router.use(authMiddleware.protect);

    router
        .route('/')
        .get(checkinController.getTodayCheckin)
        .post(checkinController.create);


    return router;
}