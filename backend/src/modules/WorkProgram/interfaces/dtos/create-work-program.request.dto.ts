import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateWorkProgramRequest {
    @IsString()
    @IsNotEmpty()
    name: string = ''

    @IsString()
    @IsNotEmpty()
    description: string = ''

    @IsString()
    @IsNotEmpty()
    picId: string = ''

    @IsDate()
    deadline: Date = new Date()
}