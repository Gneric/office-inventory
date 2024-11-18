import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Assignment {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', {})
    item_id : string

    @Column('text', {})
    supervisor_id : string

    @Column('text', {})
    fromUser : string

    @Column('text', {})
    toUser : string

    @Column('boolean', {})
    damaged : boolean

    @Column('text', {})
    message : string

}
