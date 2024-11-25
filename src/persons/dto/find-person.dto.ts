import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class FindPersonDTO {

    @IsEmail()
    @IsString()
    @MinLength(1)
    @IsOptional()
    email?: string

    @IsString()
    @MinLength(1)
    @IsOptional()
    fullName?: string

}