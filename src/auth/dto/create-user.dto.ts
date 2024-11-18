import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDTO {

    @ApiProperty({})
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({})
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string

    @ApiProperty({})
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: `The password must have a Uppercase, lowercase letter and a number`
    })
    password: string

    @ApiProperty({})
    @IsString()
    @MinLength(5)
    fullName: string

    @ApiProperty({})
    @IsBoolean()
    @IsOptional()
    isActive?: boolean

}
