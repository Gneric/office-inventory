import { IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateCategoryDto {

    @IsString()
    @MinLength(1)
    code : string

    @IsString()
    @MinLength(1)
    name : string

    @IsNumber()
    createdAt : number

    @IsNumber()
    @IsOptional()
    updatedAt? : number

}
