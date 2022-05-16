import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class CreateCheckInDto {
    @IsDefined()
    @Expose()
    userId: number;

    @IsDefined()
    @Expose()
    officeId: number;

    @IsDefined()
    @Expose()
    proof: string;

}