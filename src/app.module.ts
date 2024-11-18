import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { FilesModule } from './files/files.module';
import { EntitiesModule } from './entities/entities.module';

@Module({
  imports: [
    // Sets up the app to read the `.env` file
    ConfigModule.forRoot(),
    // Connects the app with the ORM which connects to the DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    // App Modules
    ItemsModule, AuthModule, CommonModule, CategoriesModule, BrandsModule, AssignmentsModule, FilesModule, EntitiesModule
  ],
})
export class AppModule {}