import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateCategoryDto {

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    code : string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    name : string

    @ApiProperty({})
    @IsNumber()
    createdAt : number

    @ApiProperty({})
    @IsNumber()
    @IsOptional()
    updatedAt? : number

}
