import { User } from "src/auth/entities/user.entity"
import { File } from "src/files/entities/file.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity({ name: 'items' })
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
    optimized : boolean

    @Column('text', {})
    specs : string

    @Column('numeric', {})
    createdAt : number

    @Column('numeric', {})
    updatedAt?: number

    @ManyToOne(
        () => User,
        ( user ) => user.item
    )
    createdBy: User

    @OneToMany(
        () => File,
        ( file ) => file.itemId,
        { eager: true }
    )
    files?: File[]

}
