import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { Item } from 'src/items/entities';
import { Person } from 'src/persons/entities/person.entity';
import { ItemsService } from 'src/items/items.service';
import { PersonService } from 'src/persons/person.service';
import { FindAssignmentDto } from './dto/find-assigment.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class AssignmentsService {

  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,

    private readonly itemService: ItemsService,

    private readonly personService: PersonService
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const item = await this.itemService.findOne(createAssignmentDto.item_id)
    const fromPerson = await this.personService.findOne(createAssignmentDto.fromPerson)
    const toPerson = await this.personService.findOne(createAssignmentDto.toPerson)

    const assignment = await this.assignmentRepository.create({
      ...createAssignmentDto,
      item,
      fromPerson,
      toPerson
    })

    return await this.assignmentRepository.save(assignment)
  }

  async findAll(paginationDTO: PaginationDTO, findAssignmentDto: FindAssignmentDto) {
    return await this.assignmentRepository.find({
      relations: { item: true, supervisor: true, fromPerson: true, toPerson: true },
      where: {
        item: { id: findAssignmentDto.item_id },
        supervisor: { id: findAssignmentDto.supervisor_id },
        fromPerson: { id: findAssignmentDto.fromPerson },
        toPerson: { id: findAssignmentDto.toPerson },
        damaged: findAssignmentDto.damaged,
        createdAt: findAssignmentDto.createdAt
      },
      take: paginationDTO.limit,
      skip: paginationDTO.offset,
    });
  }

  async findOne(id: string) {
    return await this.assignmentRepository.findOne({
      where: { id },
      relations: { item: true, supervisor: true, fromPerson: true, toPerson: true }
    });
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    const { item_id, fromPerson, toPerson, ...updateDetails } = updateAssignmentDto

    const item = await this.itemService.findOne(item_id)
    const personFrom = await this.personService.findOne(fromPerson)
    const personTo = await this.personService.findOne(toPerson)
    
    const assignment = await this.assignmentRepository.preload({
      id,
      ...updateDetails,
      item,
      fromPerson: personFrom,
      toPerson: personTo
    })

    if ( !assignment )
      throw new NotFoundException('Assignment not found')
    
    return await this.assignmentRepository.save(assignment)
  }

}
