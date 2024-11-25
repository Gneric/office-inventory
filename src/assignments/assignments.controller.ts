import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { find } from 'rxjs';
import { FindAssignmentDto } from './dto/find-assigment.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  findAll(
    @Query() paginationDTO: PaginationDTO,  
    @Body() findAssignmentDto: FindAssignmentDto
  ) {
    return this.assignmentsService.findAll(paginationDTO,findAssignmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

}
