import { ILogger } from '@src/components/logger/@types/ILogger';
import { CreateCheckInDto } from './@types/dto/CreateCheckIn.dto';
import { HttpStatusCode } from '@src/constant/httpStatusCode';
import { catchAsyncRequestHandler } from '@src/utils/catchAsyncRequestHandler';
import { ICheckinService } from './@types/ICheckinService';

export const CheckInController = (checkinService: ICheckinService, logger: ILogger) => {
    const getTodayCheckin = catchAsyncRequestHandler(async (req, res, next) => {
        const userId = req.user!.id;
        const officeId = +req.query.officeId!;

        const isCheckedIn = await checkinService.findCheckInToday(userId, officeId);

        logger.info("Get user's check-in today successfully");

        res.status(HttpStatusCode.OK).json({
            code: HttpStatusCode.OK,
            data: isCheckedIn
        })
    })

    const create = catchAsyncRequestHandler(async (req, res, next) => {
        const userId = req.user!.id;

        const createCheckInDto = { userId, officeId: req.body.officeId, proof: req.body.proof } as CreateCheckInDto;

        const checkin = await checkinService.createCheckIn(createCheckInDto);

        logger.info("Create user's check-in successfully");

        res.status(HttpStatusCode.OK).json({
            code: HttpStatusCode.OK,
            data: checkin
        });
    });

    return {getTodayCheckin, create}
}