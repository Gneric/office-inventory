import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class CreatePersonDto {

    @ApiProperty({})
    @IsEmail()
    @IsString()
    @MinLength(1)
    email: string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    fullName: string

    @ApiProperty({})
    @IsOptional()
    isActive: boolean

}