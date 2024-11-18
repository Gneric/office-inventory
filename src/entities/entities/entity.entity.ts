import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Entity {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', {})
    fullName : string

    @Column('text', { unique: true })
    email : string

    @Column('boolean', {})
    isActive?: boolean

    @Column('number', {})
    createdAt: number

    @Column('number', {})
    updatedAt: number

}
