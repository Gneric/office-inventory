import { ApiProperty } from '@nestjs/swagger'
import * as bycrpt from 'bcrypt'
import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm'

export class User {

    @ApiProperty({
        example: '45093ae6-0bb5-4893-827d-1f082fbe07ff',
        description: 'User Identifier',
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
        description: 'User name'
    })
    @Column('text', {})
    username: string

    @ApiProperty({
        description: 'encrypted user password'
    })
    @Column('text', { select: false })
    password: string

    @ApiProperty({
        example: 'Super User',
        description: "user's fullName"
    })
    @Column('text', {})
    fullName: string

    @ApiProperty({
        default: true,
        description: 'user active flag '
    })
    @Column('boolean', { default: true })
    isActive?: boolean

    @BeforeInsert()
    hashPassword() {
        this.password = bycrpt.hashSync(this.password, 10)
    }

}
