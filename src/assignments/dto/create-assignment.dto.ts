import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateAssignmentDto {

    @IsString()
    @IsUUID()
    item_id: string

    @IsString()
    @IsUUID()
    supervisor_id: string

    @IsString()
    @IsUUID()
    fromPerson: string

    @IsString()
    @IsUUID()
    toPerson: string

    @IsBoolean()
    damaged: boolean

    @IsString()
    message: string

    @IsNumber()
    createdAt: number

}
