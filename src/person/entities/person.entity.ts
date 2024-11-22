import { ApiProperty } from "@nestjs/swagger"
import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Person {

    @ApiProperty({
        example: '45093ae6-0bb5-4893-827d-1f082fbe07ff',
        description: 'user identifier',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        example: 'username@emaildomain.com',
        description: 'user email',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    email: string

    @ApiProperty({
        example: 'Super User',
        description: "user's fullName"
    })
    @Column('text', {})
    fullName: string

    @ApiProperty({
        default: true,
        description: 'user active flag'
    })
    @Column('boolean', { default: true })
    isActive: boolean

}
