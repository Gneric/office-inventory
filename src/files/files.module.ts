import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemImage } from 'src/items/entities';
import { ItemsModule } from 'src/items/items.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    TypeOrmModule.forFeature([ItemImage]),
    ItemsModule
  ]
})
export class FilesModule {}
