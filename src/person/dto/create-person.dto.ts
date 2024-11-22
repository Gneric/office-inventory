import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class CreatePersonDto {

    @IsEmail()
    @IsString()
    @MinLength(1)
    email: string

    @IsString()
    @MinLength(1)
    fullName: string

    @IsOptional()
    isActive: boolean

}