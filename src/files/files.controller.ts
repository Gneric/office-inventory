import { Controller, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { ConfigService } from '@nestjs/config';
import { fileFilter } from './helpers/file-filter';
import { fileNamer } from './helpers/file-namer';

@Controller('files')
export class FilesController {
  
  constructor(
    private readonly filesService: FilesService
  ) {}

  @Post('product/:id')
  @UseInterceptors( 
    FilesInterceptor('files', 5, {
      fileFilter: fileFilter,
      storage: diskStorage({ destination: './static/item/uploads', filename: fileNamer })
    }),
  )
  uploadFiles(@Param('id') id: string, @UploadedFile() files: Express.Multer.File[] ){
    this.filesService.attachFileToItem(id, files)
  }

}
