import { CheckInDto } from './@types/dto/Checkin.dto';
import { CreateCheckInDto } from './@types/dto/CreateCheckIn.dto';
import { CheckInRepository } from './checkin.repository';
import { ICheckinService } from './@types/ICheckinService';

export const CheckInService = (
    checkInRepository: CheckInRepository
): ICheckinService => {
   const createCheckIn = async (dto: CreateCheckInDto): Promise<CheckInDto> => {
        const checkIn = await checkInRepository.save({
            ...dto
        });
        
        return {
            userId: checkIn.userId,
            officeId: checkIn.officeId,
            checkInDate: checkIn.createdAt
        }
   }

   const findCheckInToday = async (userId: number, officeId: number): Promise<CheckInDto> => {
        const todayCheckIn = await checkInRepository
                                                .createQueryBuilder("checkin")
                                                .where("checkin.user_id = :userId", { userId: userId})
                                                .andWhere("checkin.office_id = :officeId", { officeId: officeId})
                                                .andWhere("checkin.created_at >= CURRENT_DATE")
                                                .getOne();
                                                

        return {
            userId: todayCheckIn?.userId,
            officeId: todayCheckIn?.officeId,
            checkInDate: todayCheckIn?.createdAt
        }
 
   }

   return {
       createCheckIn,
       findCheckInToday,
   }
}