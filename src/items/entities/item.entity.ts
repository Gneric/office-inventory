import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Item {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', { unique: true })
    serial_number : string

    @Column('text', {})
    ip : string

    @Column('text', {})
    name : string

    @Column('text', {})
    category_id : string 

    @Column('text', {})
    brand_id : string

    @Column('text', {})
    optimized : string

    @Column('text', {})
    specs : string

    @Column('numeric', {})
    created_at : number

    @Column('numeric', {})
    update_at : number

}
