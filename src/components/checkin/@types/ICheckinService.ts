import { CheckInDto } from './dto/Checkin.dto';
import { CreateCheckInDto } from './dto/CreateCheckIn.dto'

export interface ICheckinService {
    createCheckIn(
        createCheckInDto: CreateCheckInDto
    ): Promise<CheckInDto>;

    
    findCheckInToday(userId: number, officeId: number ): Promise<CheckInDto>
}