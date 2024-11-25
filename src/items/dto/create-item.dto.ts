
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateItemDto {

    @IsString()
    @MinLength(1)
    serial_number : string

    @IsString()
    @MinLength(1)
    ip : string

    @IsString()
    @MinLength(1)
    name : string

    @IsString()
    @MinLength(1)
    category_id : string

    @IsString()
    @MinLength(1)
    brand_id : string

    @IsBoolean()
    optimized : boolean

    @IsString()
    @MinLength(1)
    specs : string

    @IsNumber()
    createdAt : number

    @IsNumber()
    @IsOptional()
    updatedAt? : number

}
