import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'brands' })
export class Brand {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', { unique: true })
    code : string

    @Column('text', {})
    name : string

    @Column('numeric', {})
    createdAt : number

    @Column('numeric', {})
    updatedAt? : number

}
