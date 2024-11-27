
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateItemDto {

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    serial_number : string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    ip : string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    name : string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    category_id : string

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    brand_id : string

    @ApiProperty({})
    @IsBoolean()
    optimized : boolean

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    specs : string

    @ApiProperty({})
    @IsNumber()
    createdAt : number

    @ApiProperty({})
    @IsNumber()
    @IsOptional()
    updatedAt? : number

}
