import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateAssignmentDto {

    @ApiProperty({})
    @IsString()
    @IsUUID()
    item_id: string

    @ApiProperty({})
    @IsString()
    @IsUUID()
    supervisor_id: string

    @ApiProperty({})
    @IsString()
    @IsUUID()
    fromPerson: string

    @ApiProperty({})
    @IsString()
    @IsUUID()
    toPerson: string

    @ApiProperty({})
    @IsBoolean()
    damaged: boolean

    @ApiProperty({})
    @IsString()
    message: string

    @ApiProperty({})
    @IsNumber()
    createdAt: number

}
