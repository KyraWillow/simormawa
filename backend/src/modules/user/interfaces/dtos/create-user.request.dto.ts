import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "../../domain/user.entity";


export class CreateUserRequestDto {
    @IsEmail()
    email: string = ''

    @IsString()
    @IsNotEmpty()
    name: string = ''

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role = Role.PIC_STAFF

    @IsString()
    @MinLength(12)
    password: string = ''
}