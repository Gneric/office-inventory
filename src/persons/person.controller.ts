import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto, UpdatePersonDto, FindPersonDTO } from './dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll(
    @Query() paginationDTO: PaginationDTO,
    @Body() findPersonDTO: FindPersonDTO 
  ) {
    return this.personService.findAll(paginationDTO, findPersonDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
