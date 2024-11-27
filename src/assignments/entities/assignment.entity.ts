import { User } from "src/auth/entities/user.entity"
import { Item } from "src/items/entities/item.entity"
import { Person } from "src/persons/entities/person.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'assignments' })
export class Assignment {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @OneToOne(() => Item, { cascade: true, eager: true } )
    @JoinColumn({ name: 'item_id' })
    item: Item

    @OneToOne(() => User, { cascade: true, eager: true } )
    @JoinColumn({ name: 'supervisor_id' })
    supervisor: User

    @OneToOne(() => Person, { cascade: true, eager: true } )
    @JoinColumn({ name: 'fromPerson'})
    fromPerson: Person

    @OneToOne(() => Person, { cascade: true, eager: true } )
    @JoinColumn({ name: 'toPerson'})
    toPerson: Person

    @Column('boolean', {})
    damaged : boolean

    @Column('text', {})
    message : string

    @Column('numeric', {})
    createdAt: number

}
