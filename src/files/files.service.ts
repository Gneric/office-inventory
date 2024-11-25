import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemImage } from 'src/items/entities';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  
  constructor(
    @InjectRepository(ItemImage)
    private readonly itemImageRepository: Repository<ItemImage>,

    private readonly itemService: ItemsService
  ){}

  attachFileToItem(id: string, files: Express.Multer.File[]) {
    const item = this.itemService.findOne(id)

    const promises = []

    files.forEach( file => {
      promises.push(
        this.itemImageRepository.save({ item, url: file.filename })
      )
    })
  }

  async deleteFiles(id: string, files: string[]) {
    const item : Item = await this.itemService.findOne(id)

    item.files.forEach( file => {
      if( files.includes(file.id) ) {
        this.itemImageRepository.delete({ id: file.id })
      }
    })
    
    return await this.itemService.findOne(id)
  }
  
}
