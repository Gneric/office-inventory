import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemImage } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemImage)
    private readonly itemImageRepository: Repository<ItemImage>
    
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create({
      ...createItemDto,
    })

    await this.itemRepository.save(item)
    return item
  }


  async findAll() {
    return await this.itemRepository.find({})
  }

  async findOne(id: string) {
    return await this.itemRepository.findBy({ id })
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.preload({ id: id, ...updateItemDto })
    if( !item ) 
      throw new NotFoundException(`Item with id: ${id} not found`)
    await this.itemRepository.save(item)

    return await this.findOne(id)
  }

  async remove(id: string) {
    const item = await this.findOne(id)
    await this.itemRepository.remove(item)
    return
  }

  private handleErrorException( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail)
    throw new InternalServerErrorException(`Unexpected error, check logs`)
  }
}
