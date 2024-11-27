import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class FindPersonDTO {

    @ApiProperty({ required: false })
    @IsEmail()
    @IsString()
    @MinLength(1)
    @IsOptional()
    email?: string

    @ApiProperty({ required: false })
    @IsString()
    @MinLength(1)
    @IsOptional()
    fullName?: string

}