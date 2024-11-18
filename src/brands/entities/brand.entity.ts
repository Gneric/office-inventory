import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Brand {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', { unique: true })
    code : string

    @Column('text', {})
    name : string

    @Column('number', {})
    createdAt : number

    @Column('number', {})
    updatedAt : number

}