import { Item } from "src/items/entities/item.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'itemImages' })
export class ItemImage {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {})
    url: string

    @ManyToOne(
        () => Item,
        ( item ) => item.files
    )
    itemId: Item
    
}
