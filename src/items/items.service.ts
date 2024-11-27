import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>    
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const item = this.itemRepository.create({
        ...createItemDto,
      })
  
      await this.itemRepository.save(item)
      return item
    } catch (error) {
      this.handleErrorException(error)
    }
  }


  async findAll() {
    return await this.itemRepository.find({
      relations: { files: true, category: true, brand: true }
    })
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: { files: true, category: true, brand: true }
    })

    if ( !item ) 
      throw new NotFoundException(`Item with id: ${id} not found`)
    
    return item
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const item = await this.itemRepository.preload({ id: id, ...updateItemDto })
      if( !item ) 
        throw new NotFoundException(`Item with id: ${id} not found`)
      await this.itemRepository.save(item)
  
      return await this.findOne(id)
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  async remove(id: string) {
    const item = await this.findOne(id)
    item.isActive = false
    await this.itemRepository.save(item)
    return
  }

  private handleErrorException( error : any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail)
    throw new InternalServerErrorException(`Unexpected error, check logs`)
  }
}
