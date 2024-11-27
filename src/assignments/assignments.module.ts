import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { ItemsModule } from 'src/items/items.module';
import { PersonModule } from 'src/persons/person.module';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    ItemsModule,
    PersonModule
  ]
})
export class AssignmentsModule {}
