import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemImage } from 'src/items/entities';
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
}
