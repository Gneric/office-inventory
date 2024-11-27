import { ApiProperty } from '@nestjs/swagger'
import * as bycrpt from 'bcrypt'
import { Item } from 'src/items/entities/item.entity'
import { Person } from 'src/persons/entities/person.entity'
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User {

    @ApiProperty({
        example: '45093ae6-0bb5-4893-827d-1f082fbe07ff',
        description: 'User Identifier',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

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
        default: true,
        description: 'user active flag '
    })
    @Column('boolean', { default: true })
    isActive?: boolean

    @OneToOne(() => Person, { cascade: true, eager: true }) // Cascade to save person automatically when saving user
    @JoinColumn({ name: 'personId' }) // Maps the foreign key
    person: Person;

    @OneToMany(
        () => Item,
        ( item ) => item.createdBy,
        { eager: true }
    )
    items?: Item[]

    @BeforeInsert()
    hashPassword() {
        this.password = bycrpt.hashSync(this.password, 10)
    }

}
