import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll() {
    return await this.personRepository.find();
  }

  async findOne(id: string) {
    const person = this.personRepository.findOneBy({ id });
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
