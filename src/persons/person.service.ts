import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { FindPersonDTO } from './dto';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  async findAll(paginationDTO: PaginationDTO, findPersonDTO: FindPersonDTO) {
    return await this.personRepository.find({
      where: {
        email: findPersonDTO.email ?? '',
        fullName: findPersonDTO.fullName ?? '',
        isActive: true
      },
      take: paginationDTO.limit,
      skip: paginationDTO.offset
    })
  }

  async findOne(id: string) {
    const person = this.personRepository.findOne({
      where: { id, isActive: true }
    });
    if ( !person )
      throw new NotFoundException(`Person with id: ${id} not found`)
    return person
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    this.personRepository.merge(person, updatePersonDto);
    return this.personRepository.save(person);
  }

  async remove(id: string) {
    const person = await this.findOne(id);
    await this.personRepository.remove(person);
    return
  }
}
