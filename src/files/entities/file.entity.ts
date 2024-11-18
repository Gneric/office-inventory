import { Column, PrimaryGeneratedColumn } from "typeorm"

export class File {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column('text', {})
    url : string

    @Column('text', {})
    slug: string

    // TODO: Limitar los tipos de archivos a adjuntos a assigments y adjuntos de producto
    @Column('text', {}) 
    type : string

    @Column('text', {})
    attachment_id : string
    
}
