import { User } from "src/auth/entities/user.entity"
import { Brand } from "src/brands/entities/brand.entity"
import { Category } from "src/categories/entities/category.entity"
import { File } from "src/files/entities/file.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"


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

    @OneToOne( () => Category, { cascade: true, eager: true } )
    @JoinColumn({ name: 'category_id' })
    category: Category

    @OneToOne( () => Brand, { cascade: true, eager: true } )
    @JoinColumn({ name: 'brand_id' })
    brand: Brand

    @Column('boolean', {})
    optimized : boolean

    @Column('text', {})
    specs : string

    @Column('numeric', {})
    createdAt : number

    @Column('numeric', {})
    updatedAt?: number

    @ManyToOne( () => User, ( user ) => user.item )
    createdBy: User

    @OneToMany( () => File, ( file ) => file.itemId, { eager: true } )
    file?: File[]

}
